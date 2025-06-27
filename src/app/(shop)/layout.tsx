'use client'
import { AuthModal } from '@/components'
import { ToastProvider } from '@/components/ui/toast/toast-provider/ToastProvider'
import dynamic from 'next/dynamic'

// const AuthModal = dynamic(() => import('@/components/auth/AuthModal'), {
//   ssr: false
// })
// const TourWizard = dynamic(
//   async () => (await import('@/components/ui/TourWizard')).TourWizard,
//   {
//     ssr: false,
//   }
// )
const TopMenu = dynamic(() => import('@/components/ui/top-menu/TopMenu'), {
  ssr: false,
})
const Sidebar = dynamic(() => import('@/components/ui/side-menu/SideMenu'), {
  ssr: false,
})
const CreateTableDiscussion = dynamic(
  async () =>
    (await import('@/components/crear-tablero-discusion/CreateTableDiscussion'))
      .CreateTableDiscussion,
  {
    ssr: false,
  }
)

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main lang='en' className='min-h-screen'>
      <div className='h-[53px]'></div>
      <ToastProvider />
      <AuthModal />
      <CreateTableDiscussion />
      <TopMenu />
      <Sidebar />
      <div className='px-6 sm:px-10'>{children}</div>
    </main>
  )
}
