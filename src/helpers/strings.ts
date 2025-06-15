export const getInitials = (fullName: string) => {
  const names = fullName?.split(' ')
  const result = names?.map((name) => name.charAt(0).toUpperCase()).slice(0, 2)
  return result?.join('')
}

export const parsePriceBreaks = (priceBreaks: string) => {
  if (!priceBreaks) return []
  return priceBreaks
    .split(';')
    .map((entry) => {
      const qtyMatch = entry.match(/Qty: ([^,]+)/)
      const priceMatch = entry.match(/Price: ([^,]+)/)
      const currencyMatch = entry.match(/Currency: ([^,]+)/)
      return {
        qty: qtyMatch ? qtyMatch[1].trim() : '',
        price: priceMatch ? priceMatch[1].trim() : '',
        currency: currencyMatch ? currencyMatch[1].trim() : '',
      }
    })
    .filter((e) => e.qty && e.price && e.currency)
}
