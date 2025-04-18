import React from 'react'
import { CommentProfile } from './CommentProfile'
import { IComment } from '@/interfaces/table.interface'
import useSession from '@/hooks/useSession'

interface IProps {
  comment: IComment
  fetchComments: () => Promise<void>
}

export const CommentItem = ({ comment, fetchComments }: IProps) => {
  const { profile } = useSession()
  const { author } = comment
  const isCommentOwner = profile?.id === author?.id
  return (
    <div className='flex flex-col gap-2'>
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
      />
      <p className='break-all overflow-wrap-anywhere'>{comment.content}</p>
    </div>
  )
}
