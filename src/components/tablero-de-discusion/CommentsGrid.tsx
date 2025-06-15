'use client'
import React, { Fragment } from 'react'
import { CommentItem } from './CommentItem'
import { Divider } from '../ui/components/Divider'
import { IComment } from '@/interfaces/table.interface'
import { useComments } from './useComments'
import { CommentItemSkelleton } from './CommentItemSkelleton'
interface IProps {
  comments: IComment[]
  dashboardId: string
}
export const CommentsGrid = ({
  comments: commentsProps,
  dashboardId,
}: IProps) => {
  const { comments, isLoadingAdd, isLoadingComments, fetchComments } =
    useComments({
      comments: commentsProps,
      dashboardId,
    })
  return (
    <div className='w-full flex flex-col gap-6'>
      {comments?.map((comment, index) => (
        <Fragment key={comment.id}>
          <CommentItem
            key={comment.id}
            fetchComments={fetchComments}
            comment={comment}
          />
          {index !== comments.length - 1 && <Divider className='w-full h-1' />}
        </Fragment>
      ))}
      {isLoadingAdd && isLoadingComments && (
        <>
          {comments.length > 0 && <Divider className='w-full h-1' />}
          <CommentItemSkelleton />
        </>
      )}
      {comments.length === 0 && !isLoadingAdd && (
        <p className='text-center text-sm text-surface-muted'>
          ¡Se el primero en comentar!
        </p>
      )}
    </div>
  )
}
