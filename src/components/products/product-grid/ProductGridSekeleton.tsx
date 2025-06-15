import React from 'react'

export const ProductGridSekeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 mb-10'>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className='flex flex-col justify-between items-start rounded-xl overflow-hidden shadow-[0px_3px_6px_0px_rgba(34,34,34,0.16)] bg-white h-full w-full text-sm animate-pulse max-h-[301px]'
        >
          <div className='w-full h-[95px] bg-gray-200 rounded-t-xl border-b border-surface-strokes' />
          <div className='flex gap-1 w-full flex-col p-[10px]'>
            <div className='h-4 bg-gray-200 rounded w-3/4 mb-1' />
            <div className='h-3 bg-gray-100 rounded w-1/2 mb-2' />
            <div className='h-5 bg-gray-200 rounded w-1/3 mb-3' />
            <div className='flex gap-2'>
              <div className='h-8 w-24 bg-gray-200 rounded' />
              <div className='h-8 w-28 bg-gray-200 rounded' />
            </div>
          </div>
          <div className='w-full h-[1px] bg-surface-strokes'></div>
          <div className='flex flex-col p-[10px] gap-1 w-full'>
            <div className='h-4 bg-gray-200 rounded w-2/3 mb-1' />
          </div>
          <div className='flex flex-col p-[10px] gap-2 w-full border-t'>
            <div className='h-4 bg-gray-200 rounded w-3/4 mb-1' />
          </div>
        </div>
      ))}
    </div>
  )
}
