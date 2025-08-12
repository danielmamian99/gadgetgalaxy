import { useState, useEffect, useRef, useCallback } from 'react'
import useSession from '@/hooks/useSession'

export interface ChatMessage {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
  isLoading?: boolean
  components?: Array<{
    id: string
    name: string
    price: number
    stock: number
  }>
}

export interface ConnectionStatus {
  connected: boolean
  reconnecting: boolean
  error: string | null
}

export const useChatIA = () => {
  const { authUser } = useSession()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    reconnecting: false,
    error: null,
  })
  const [isTyping, setIsTyping] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_WEB_SOCKET_URL || 'ws://localhost:8000'}/ws/ia/`

    try {
      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        console.log('Conectado al chat IA')
        setConnectionStatus({
          connected: true,
          reconnecting: false,
          error: null,
        })
        reconnectAttempts.current = 0

        // Enviar token de autenticación si está disponible
        if (authUser?.token) {
          wsRef.current?.send(
            JSON.stringify({
              type: 'auth',
              token: authUser.token,
            })
          )
        }
      }

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)

          switch (data.type) {
            case 'message':
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.isLoading && msg.type === 'ai'
                    ? {
                        ...msg,
                        content: data.content,
                        isLoading: false,
                        components: data.components,
                      }
                    : msg
                )
              )
              setIsTyping(false)
              break

            case 'typing':
              setIsTyping(data.typing)
              break

            case 'error':
              console.error('Error del chat IA:', data.message)
              setConnectionStatus((prev) => ({
                ...prev,
                error: data.message,
              }))
              break
          }
        } catch (error) {
          console.error('Error parsing websocket message:', error)
        }
      }

      wsRef.current.onclose = (event) => {
        console.log('Desconectado del chat IA')
        setConnectionStatus((prev) => ({
          ...prev,
          connected: false,
        }))
        setIsTyping(false)

        // Intentar reconectar si no fue un cierre intencional
        if (
          !event.wasClean &&
          reconnectAttempts.current < maxReconnectAttempts
        ) {
          setConnectionStatus((prev) => ({
            ...prev,
            reconnecting: true,
          }))

          reconnectTimeoutRef.current = setTimeout(
            () => {
              reconnectAttempts.current++
              connect()
            },
            Math.pow(2, reconnectAttempts.current) * 1000
          ) // Backoff exponencial
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setConnectionStatus((prev) => ({
            ...prev,
            error:
              'No se pudo conectar al chat IA. Intenta recargar la página.',
          }))
        }
      }

      wsRef.current.onerror = (error) => {
        console.error('Error en websocket:', error)
        setConnectionStatus((prev) => ({
          ...prev,
          error: 'Error de conexión con el chat IA',
        }))
      }
    } catch (error) {
      console.error('Error creando websocket:', error)
      setConnectionStatus({
        connected: false,
        reconnecting: false,
        error: 'Error al conectar con el chat IA',
      })
    }
  }, [authUser?.token])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnect')
      wsRef.current = null
    }
  }, [])

  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setConnectionStatus((prev) => ({
        ...prev,
        error: 'No hay conexión disponible',
      }))
      return
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    }

    const aiLoadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      content: '',
      type: 'ai',
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, aiLoadingMessage])
    setIsTyping(true)

    wsRef.current.send(
      JSON.stringify({
        type: 'message',
        content,
        timestamp: new Date().toISOString(),
      })
    )
  }, [])

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])

  const retry = useCallback(() => {
    reconnectAttempts.current = 0
    setConnectionStatus((prev) => ({
      ...prev,
      error: null,
      reconnecting: true,
    }))
    connect()
  }, [connect])

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    messages,
    connectionStatus,
    isTyping,
    sendMessage,
    clearChat,
    retry,
    connect,
    disconnect,
  }
}
