import { stringNumberFormatToSimpleNumber } from '@/app/utils/formatter-text'
import { IPriceBreak } from '@/interfaces/table.interface'

interface IProps {
  price: string
  priceBreaks: IPriceBreak[]
  quantity: number
}
export const useCalculateDiscounts = ({
  price,
  priceBreaks,
  quantity,
}: IProps) => {
  // Calcula el mejor precio unitario según priceBreaks y cantidad
  const getCurrentUnitPrice = (): number => {
    const safePrice = stringNumberFormatToSimpleNumber(price)
    if (!priceBreaks || priceBreaks.length === 0) return safePrice
    // Ordenar los priceBreaks por qty ascendente
    const sorted = [...priceBreaks].sort(
      (a, b) => Number(a.qty) - Number(b.qty)
    )
    let best = safePrice
    for (const pb of sorted) {
      const pbPrice = stringNumberFormatToSimpleNumber(pb.price)
      if (quantity >= Number(pb.qty)) {
        best = pbPrice
      }
    }
    return best
  }

  const getCurrency = () => {
    if (!priceBreaks || priceBreaks.length === 0) return 'COP'
    // Busca el currency del mejor priceBreak
    const sorted = [...priceBreaks].sort(
      (a, b) => Number(a.qty) - Number(b.qty)
    )
    let currency = 'COP'
    for (const pb of sorted) {
      if (quantity >= Number(pb.qty)) {
        currency = pb.currency
      }
    }
    return currency
  }

  const currentUnitPrice = getCurrentUnitPrice()
  const originalUnitPrice = stringNumberFormatToSimpleNumber(price)
  const currency = getCurrency()
  const hasDiscount = currentUnitPrice < originalUnitPrice

  return {
    hasDiscount,
    currency,
    currentUnitPrice,
    originalUnitPrice,
  }
}
