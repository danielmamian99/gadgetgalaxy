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

  const onDeleteComment = () => {
    setIsDeleteModalOpen(true)
  }
  const onBack = () => {
    window.history.back()
  }
  const onAcceptRequest = () => {
    setIsAcceptModalOpen(true)
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
  return (
    <>
      <DeleteCommentModal
        onDelete={fetchComments}
        commentId={commentId}
        dashboardId={dashboardId}
      />
      {request && (
        <AcceptRequestModal
          isOpen={isAcceptModalOpen}
          onClose={() => setIsAcceptModalOpen(false)}
          onAccept={handleAccept}
          onReject={handleReject}
          isLoading={isLoadingAccept}
        />
      )}
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

        <div className='flex gap-2 items-center'>
          <div className='mr-2' style={{ zoom: 0.4 }}>
            <ProductGrid products={comment.components} isPresentation />
          </div>

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
              {comment.requestStatus === 'pending' && 'Pendiente'}
              {comment.requestStatus === 'approved' && 'Aprobada'}
              {comment.requestStatus === 'rejected' && 'Rechazada'}
            </span>
          )}
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
          {isCommentOwner && request && (
            <button
              onClick={onAcceptRequest}
              className='rounded-lg px-3 py-1 md:px-4 md:py-2 bg-primary text-white text-xs md:text-sm font-semibold hover:brightness-90 active:brightness-75 flex items-center justify-center'
            >
              Aceptar / Responder
            </button>
          )}
        </div>
      </div>
    </>
  )
}
