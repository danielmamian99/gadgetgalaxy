import React, { useState } from 'react'
import { CommentItem } from './CommentItem'
import { IComment } from '@/interfaces/table.interface'
import GoogleIcon from '../ui/components/GoogleIcon'

interface IProps {
  comment: IComment
  fetchComments: () => Promise<void>
  depth?: number
}

export const CommentThread = ({
  comment,
  fetchComments,
  depth = 0,
}: IProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const hasReplies = comment.replies && comment.replies.length > 0

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const getRepliesCount = (comment: IComment): number => {
    let count = comment.replies?.length || 0
    comment.replies?.forEach((reply) => {
      count += getRepliesCount(reply)
    })
    return count
  }

  const totalReplies = getRepliesCount(comment)

  return (
    <div
      className={`${depth > 0 ? 'ml-3 border-l-2 border-gray-200 pl-3' : ''}`}
    >
      <div className='flex items-start gap-2'>
        {hasReplies && (
          <button
            onClick={toggleCollapse}
            className='flex-shrink-0 w-5 h-5 mt-0.5 text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center'
          >
            <GoogleIcon
              name={isCollapsed ? 'chevron_right' : 'keyboard_arrow_down'}
              className='text-base'
            />
          </button>
        )}
        {!hasReplies && depth > 0 && (
          <div className='flex-shrink-0 w-5 h-5 mt-0.5' />
        )}
        <div className='flex-1 min-w-0'>
          <CommentItem
            comment={comment}
            fetchComments={fetchComments}
            depth={depth}
          />
        </div>
      </div>

      {hasReplies && !isCollapsed && (
        <div className='mt-3'>
          {comment.replies?.map((reply, index) => (
            <div key={reply.id} className={index > 0 ? 'mt-3' : ''}>
              <CommentThread
                comment={reply}
                fetchComments={fetchComments}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      )}

      {hasReplies && isCollapsed && (
        <div className='mt-2 ml-7'>
          <button
            onClick={toggleCollapse}
            className='text-xs text-blue-600 hover:text-blue-800 font-medium'
          >
            {totalReplies} {totalReplies === 1 ? 'respuesta' : 'respuestas'} más
          </button>
        </div>
      )}
    </div>
  )
}
