import React from 'react'
import { IComment, IUser } from '@/seed/seed'
import { CommentProfile } from './CommentProfile'

interface IProps {
  comment: IComment
}

export const CommentItem = ({ comment }: IProps) => {
  const { userOwner } = comment
  return (
    <div className='flex flex-col gap-2'>
      <CommentProfile
        userInfo={{
          id: userOwner.id,
          name: userOwner.name,
          photo: userOwner.photo
        }}
        date={comment.date}
      />
      <p>{comment.comment}</p>
    </div>
  )
}
