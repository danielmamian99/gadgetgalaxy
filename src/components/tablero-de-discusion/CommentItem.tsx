import React, { useState } from 'react'
import { CommentProfile } from './CommentProfile'
import { IComment } from '@/interfaces/table.interface'
import useSession from '@/hooks/useSession'
import GoogleIcon from '../ui/components/GoogleIcon'
import { CommentTextArea } from './CommenTextArea'

interface IProps {
  comment: IComment
  fetchComments: () => Promise<void>
  depth?: number
  adminId?: string
}

export const CommentItem = ({
  comment,
  fetchComments,
  depth = 0,
  adminId,
}: IProps) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const { profile } = useSession()
  const { author } = comment
  const isCommentOwner = profile?.id === adminId
  return (
    <div className={`flex flex-col gap-2 ${depth > 0 ? 'text-sm' : ''}`}>
      <CommentProfile
        userInfo={{
          id: author?.id,
          name: author?.username,
          photo: author?.photo,
        }}
        isCommentOwner={isCommentOwner}
        fetchComments={fetchComments}
        date={comment.createdAt}
        commentId={comment.id}
        dashboardId={comment.discussionBoard}
        comment={comment}
        //@ts-ignore
        request={comment.request}
      />
      <p className='break-all overflow-wrap-anywhere'>{comment.content}</p>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => setIsReplyOpen(!isReplyOpen)}
          className='flex text-xs text-secondary items-center gap-1 w-fit hover:text-primary transition-colors'
        >
          <GoogleIcon className='text-base' name='forum' />
          <p>Responder</p>
        </button>
        {comment.replies && comment.replies.length > 0 && (
          <span className='text-xs text-gray-500'>
            {comment.replies.length}{' '}
            {comment.replies.length === 1 ? 'respuesta' : 'respuestas'}
          </span>
        )}
      </div>
      {isReplyOpen && (
        <div className='pb-2'>
          <CommentTextArea
            dashboardId={comment.discussionBoard}
            parentId={comment.id}
            onSuccess={() => setIsReplyOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
