export const capitalizeWords = (input: string): string => {
  if (!input) {
    return ''
  }
  return input.toLowerCase().replace(/(?:^|\s)\S/g, function (char) {
    return char.toUpperCase()
  })
}
export const formatPhoneNumber = (inputValue: string) => {
  const phoneNumberOnlyDigits = inputValue?.replace(/\D/g, '')

  const parts = [
    phoneNumberOnlyDigits?.slice(0, 3),
    phoneNumberOnlyDigits?.slice(3, 6),
    phoneNumberOnlyDigits?.slice(6, 10)
  ]

  const formattedPhoneNumber = parts
    ?.filter((part) => part?.length > 0)
    ?.join('-')

  return formattedPhoneNumber
}

export const stringNumberFormatToSimpleNumber = (value: string) => {
  const newValue = value?.replace(/[^0-9]|\$|,/g, '')?.trim()
  return parseInt(newValue, 10)
}
