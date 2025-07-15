'use client'
import React, { Fragment, useMemo } from 'react'
import { Divider } from '../ui/components/Divider'
import { IComment } from '@/interfaces/table.interface'
import { useComments } from './useComments'
import { CommentItemSkelleton } from './CommentItemSkelleton'
import { useJoinBoardInit } from '@/hooks/useJoinBoardInit'
import { IComponent } from '@/interfaces/product.interface'
import { processComments } from './utils/processComments'
import { CommentThread } from './CommentThread'
interface IProps {
  comments: IComment[]
  dashboardId: string
  components: IComponent[]
}
export const CommentsGrid = ({
  components,
  comments: commentsProps,
  dashboardId,
}: IProps) => {
  const { comments, isLoadingAdd, isLoadingComments, fetchComments } =
    useComments({
      comments: commentsProps,
      dashboardId,
    })
  useJoinBoardInit({ dashboardId, components })

  const processedComments = useMemo(() => {
    return processComments(comments || [])
  }, [comments])

  return (
    <div className='w-full flex flex-col gap-6'>
      {processedComments?.map((comment, index) => (
        <Fragment key={comment.id}>
          <CommentThread
            key={comment.id}
            fetchComments={fetchComments}
            comment={comment}
          />
          {index !== processedComments.length - 1 && (
            <Divider className='w-full h-1' />
          )}
        </Fragment>
      ))}
      {isLoadingAdd && isLoadingComments && (
        <>
          {processedComments.length > 0 && <Divider className='w-full h-1' />}
          <CommentItemSkelleton />
        </>
      )}
      {processedComments.length === 0 && !isLoadingAdd && (
        <p className='text-center text-sm text-surface-muted'>
          ¡Se el primero en comentar!
        </p>
      )}
    </div>
  )
}
