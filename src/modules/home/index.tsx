'use client'
import React from 'react'
import { Products } from '@/components/products/Products'
import { IGadgetgalaxyComponents } from '@/interfaces/product.interface'
import { TourProvider } from './tour/TourProvider'
import { TourSearchWizzardProvider } from './tour/TourWizzardProvider'

interface IProps {
  dataComponents: IGadgetgalaxyComponents
  page: number
}

const STEPS = [
  {
    selector: '[data-tour="create-board"]',
    content:
      '¡Crea un nuevo tablero de discusión para organizar tus compras en grupo!',
    styles: {
      mask: (base: any) => ({ ...base, rx: 24 }),
      popover: (base: any) => ({ ...base, borderRadius: 16 }),
    },
  },
  {
    selector: '[data-tour="login"]',
    content:
      'Inicia sesión para guardar tus tableros y participar en la comunidad.',
    styles: {
      mask: (base: any) => ({ ...base, rx: 8 }),
      popover: (base: any) => ({ ...base, borderRadius: 8 }),
    },
  },
  {
    selector: '[data-tour="see-boards"]',
    content: 'Aquí puedes ver todos los tableros de discusión activos.',
    styles: {
      mask: (base: any) => ({ ...base, rx: 12 }),
      popover: (base: any) => ({ ...base, borderRadius: 12 }),
    },
  },
  {
    selector: '[data-tour="add-to-board"]',
    content: 'Agrega productos a tu tablero para planear compras en grupo.',
    styles: {
      mask: (base: any) => ({ ...base, rx: 20 }),
      popover: (base: any) => ({ ...base, borderRadius: 20 }),
    },
  },
]
export const HomeModule = ({ dataComponents, page }: IProps) => {
  return (
    <TourProvider disableKeyboardNavigation={true} onSkipGuide={() => {}}>
      <TourSearchWizzardProvider
        onActiveWizard={() => {}}
        onFinishTour={() => {}}
        onClickMap={() => {}}
      >
        <Products page={page} dataComponents={dataComponents} />
      </TourSearchWizzardProvider>
    </TourProvider>
  )
}
