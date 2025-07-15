import { parsePriceBreaks } from '@/helpers/strings'
import { IComponent } from '@/interfaces/product.interface'
import { useJoinBoardStore } from '@/store/unirse-tablero/unirse-tablero-store'
import { useEffect } from 'react'

export const useJoinBoardInit = ({
  dashboardId,
  components,
}: {
  dashboardId: string
  components: IComponent[]
}) => {
  const { setDashBoardId, setBoardComponents, setSelectedComponents } =
    useJoinBoardStore()
  const onInit = () => {
    setDashBoardId(dashboardId)
    setBoardComponents(
      components.map((component) => ({
        id: component.id,
        name: component.nombre,
        price: component.precio,
        providerName: component.proveedor.nombre,
        quantity: component.quantity,
        imageUrl: component.imageUrl,
        priceBreaks: component.priceBreaks
          ? parsePriceBreaks(component.priceBreaks)
          : [],
        stockNumber: component.stockNumber - component.quantity,
      }))
    )
    setSelectedComponents([])
  }

  useEffect(() => {
    onInit()
  }, [dashboardId, components])
}
