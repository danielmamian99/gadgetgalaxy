import React from 'react'

export const CommentItemSkelleton = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start gap-2'>
        <div className='w-8 h-8 rounded-full bg-surface-strokes animate-pulse' />
        <div className='flex gap-1'>
          <div className='w-24 h-4 rounded-full bg-surface-strokes animate-pulse' />
          <div className='w-16 h-4 rounded-full bg-surface-strokes animate-pulse' />
        </div>
      </div>
      <div className='w-24 h-4 rounded-full bg-surface-strokes animate-pulse' />
    </div>
  )
}
