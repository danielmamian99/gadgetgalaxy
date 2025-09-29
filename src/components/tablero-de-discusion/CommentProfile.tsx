'use client'
import { IOwnerInfo } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '../ui/components/GoogleIcon'
import { Avatar } from '../ui/avatar/Avatar'
import { formatIsoToCustom } from '@/app/utils/formatter-dates'
import { useUIStore } from '@/store/ui/ui-store'
import { DeleteCommentModal } from './modals/DeleteCommentModal'
import { AcceptRequestModal } from './modals/AcceptRequestModal'
import { updateRequestState } from '@/app/services/boards.services'
import { ProductGrid } from '../products/product-grid/ProductGrid'
import Tooltip from '../ui/tooltip'
import { ConfirmRequestModal } from './modals/ConfirmRequestModal'
interface IProps {
  userInfo: IOwnerInfo
  date?: string
  showBackButton?: boolean
  isCommentOwner?: boolean
  commentId: string
  dashboardId: string
  fetchComments: () => Promise<void>
  request?: any
  comment?: any
}
export const CommentProfile = ({
  showBackButton,
  userInfo,
  date,
  isCommentOwner,
  commentId,
  dashboardId,
  fetchComments,
  request,
  comment,
}: IProps) => {
  const setIsDeleteModalOpen = useUIStore((state) => state.setIsDeleteModalOpen)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = React.useState(false)
  const [isLoadingAccept, setIsLoadingAccept] = React.useState(false)
  const [requestType, setRequestType] = React.useState<'accept' | 'reject'>(
    'accept'
  )
  const [showComponents, setShowComponents] = React.useState(true)

  const onDeleteComment = () => {
    setIsDeleteModalOpen(true)
  }
  const onBack = () => {
    window.history.back()
  }
  const onAcceptRequest = (requestType: 'accept' | 'reject') => {
    setRequestType(requestType)
    setIsAcceptModalOpen(true)
  }

  const toggleComponents = () => {
    setShowComponents((prev) => !prev)
  }

  const handleAccept = async () => {
    setIsLoadingAccept(true)
    await updateRequestState({
      requestId: request,
      status: 'approved',
    })
    setIsLoadingAccept(false)
    setIsAcceptModalOpen(false)
    window.location.reload()
  }
  const handleReject = async () => {
    setIsLoadingAccept(true)
    await updateRequestState({
      requestId: request,
      status: 'rejected',
    })
    setIsLoadingAccept(false)
    setIsAcceptModalOpen(false)
    window.location.reload()
  }
  const isPending = comment?.requestStatus === 'pending'
  return (
    <>
      <DeleteCommentModal
        onDelete={fetchComments}
        commentId={commentId}
        dashboardId={dashboardId}
      />
      {request && (
        <ConfirmRequestModal
          title={
            requestType === 'accept'
              ? '¿Aceptar solicitud?'
              : '¿Rechazar solicitud?'
          }
          description={
            requestType === 'accept'
              ? '¿Quieres aceptar esta solicitud?'
              : '¿Quieres rechazar esta solicitud? Esta acción no se puede deshacer.'
          }
          isOpen={isAcceptModalOpen}
          onClose={() => setIsAcceptModalOpen(false)}
          onAccept={requestType === 'accept' ? handleAccept : handleReject}
          requestType={requestType}
          isLoading={isLoadingAccept}
        />
      )}
      <div className='flex justify-between w-full'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col md:flex-row items-start gap-1'>
            {showBackButton && (
              <button
                onClick={onBack}
                className='rounded-full w-8 h-8 bg-primary flex items-center justify-center'
              >
                <GoogleIcon className='text-white' name='arrow_back' />
              </button>
            )}
            <Link
              className='flex items-start gap-1'
              href={`/perfil/${userInfo?.id}`}
            >
              <Avatar name={userInfo.name} avatarUrl={userInfo.photo} />
              <div className='flex flex-col md:flex-row items-center gap-1'>
                <h2 className='text-sm'>{userInfo.name}</h2>
                {date && (
                  <>
                    {' '}
                    <div className='hidden md:block'>•</div>
                    <p className='text-sm text-secondary line'>
                      {formatIsoToCustom(date)}
                    </p>
                  </>
                )}
              </div>
            </Link>
            <div className='flex flex-row gap-1'>
              {comment?.requestStatus && (
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    comment.requestStatus === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : comment.requestStatus === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {isPending && 'Pendiente'}
                  {comment.requestStatus === 'approved' && 'Aprobada'}
                  {comment.requestStatus === 'rejected' && 'Rechazada'}
                </span>
              )}
              {isCommentOwner && request && isPending && (
                <>
                  <Tooltip content='Aceptar solicitud'>
                    <button
                      onClick={() => onAcceptRequest('accept')}
                      className='rounded-full w-6 h-6 p-1 bg-button-primary text-white hover:brightness-90 active:brightness-75 flex items-center justify-center'
                    >
                      <GoogleIcon
                        name='check'
                        className='text-white text-sm font-bold'
                      />
                    </button>
                  </Tooltip>
                  <Tooltip content='Rechazar solicitud'>
                    <button
                      onClick={() => onAcceptRequest('reject')}
                      className='rounded-full w-6 h-6 p-1 bg-notif-red text-white hover:brightness-90 active:brightness-75 flex items-center justify-center'
                    >
                      <GoogleIcon
                        name='close'
                        className='text-white text-sm font-bold'
                      />
                    </button>
                  </Tooltip>
                </>
              )}
            </div>
          </div>
          {comment?.components && comment.components.length > 0 && (
            <div className='flex flex-col gap-2'>
              <button
                onClick={toggleComponents}
                className='flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors self-start'
              >
                <GoogleIcon
                  name={showComponents ? 'visibility_off' : 'visibility'}
                  className='text-sm'
                />
                {showComponents ? 'Ocultar componentes' : 'Mostrar componentes'}
              </button>
              {showComponents && (
                <div className='mr-2' style={{ zoom: 0.8 }}>
                  <ProductGrid products={comment.components} isPresentation />
                </div>
              )}
            </div>
          )}
        </div>
        <div className='flex gap-2 items-start'>
          {isCommentOwner && (
            <button
              onClick={onDeleteComment}
              className='rounded-full w-6 h-6 md:w-8  md:h-8 bg-notif-red hover:brightness-90 active:brightness-75 flex items-center justify-center'
            >
              <GoogleIcon
                name='delete'
                className='text-white text-base md:text-xl'
              />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
