import { IComment } from '@/seed/seed'
import React from 'react'
import { CommentItem } from './CommentItem'
import { Divider } from '../ui/components'
interface IProps {
  comments: IComment[]
}
export const CommentsGrid = ({ comments }: IProps) => {
  return (
    <div className='w-full flex flex-col gap-6'>
      {comments.map((comment, index) => (
        <>
          <CommentItem key={comment.id} comment={comment} />
          {index !== comments.length - 1 && <Divider className='w-full h-1' />}
        </>
      ))}
    </div>
  )
}
