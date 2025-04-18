'use client'
import { IOwnerInfo } from '@/seed/seed'
import Link from 'next/link'
import React from 'react'
import GoogleIcon from '../ui/components/GoogleIcon'
import { Avatar } from '../ui/avatar/Avatar'
import { formatIsoToCustom } from '@/app/utils/formatter-dates'
import { useUIStore } from '@/store/ui/ui-store'
import { DeleteCommentModal } from './modals/DeleteCommentModal'
interface IProps {
  userInfo: IOwnerInfo
  date?: string
  showBackButton?: boolean
  isCommentOwner?: boolean
  commentId: string
  dashboardId: string
  fetchComments: () => Promise<void>
}
export const CommentProfile = ({
  showBackButton,
  userInfo,
  date,
  isCommentOwner,
  commentId,
  dashboardId,
  fetchComments,
}: IProps) => {
  const setIsDeleteModalOpen = useUIStore((state) => state.setIsDeleteModalOpen)
  const onDeleteComment = () => {
    setIsDeleteModalOpen(true)
  }
  const onBack = () => {
    window.history.back()
  }
  return (
    <>
      <DeleteCommentModal
        onDelete={fetchComments}
        commentId={commentId}
        dashboardId={dashboardId}
      />
      <div className='flex justify-between w-full'>
        <div className='flex items-start gap-1'>
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
        </div>
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
    </>
  )
}
