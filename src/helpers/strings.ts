export const getInitials = (fullName: string) => {
  const names = fullName?.split(' ')
  const result = names?.map((name) => name.charAt(0).toUpperCase()).slice(0, 2)
  return result?.join('')
}
