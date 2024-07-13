'use client'
import { AuthModal } from '@/components'
import dynamic from 'next/dynamic'

// const AuthModal = dynamic(() => import('@/components/auth/AuthModal'), {
//   ssr: false
// })
const TopMenu = dynamic(() => import('@/components/ui/top-menu/TopMenu'), {
  ssr: false
})
const Sidebar = dynamic(() => import('@/components/ui/sidebar/Sidebar'), {
  ssr: false
})

export default function ShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main lang='en' className='min-h-screen'>
      <div className='h-[53px]'></div>
      <AuthModal />
      <TopMenu />
      <Sidebar />
      <div className='px-6 sm:px-10'>{children}</div>
    </main>
  )
}
