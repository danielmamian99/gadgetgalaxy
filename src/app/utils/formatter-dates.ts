export const formatIsoToCustom = (dateStr: string): string => {
  const date = new Date(dateStr)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0') // Meses van de 0 a 11
  const year = date.getUTCFullYear()

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year}, ${hours}:${minutes}`
}
