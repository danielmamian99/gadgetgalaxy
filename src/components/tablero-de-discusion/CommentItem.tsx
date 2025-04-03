import React from 'react'
import { IComment, IUser } from '@/seed/seed'
import { CommentProfile } from './CommentProfile'

interface IProps {
  comment: IComment
}

export const CommentItem = ({ comment }: IProps) => {
  const { author } = comment

  return (
    <div className='flex flex-col gap-2'>
      <CommentProfile
        userInfo={{
          id: author?.id,
          name: author?.username,
          photo: author?.photo,
        }}
        date={comment.createdAt}
      />
      <p>{comment.content}</p>
    </div>
  )
}
