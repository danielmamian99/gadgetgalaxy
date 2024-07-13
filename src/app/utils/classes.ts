export const composeClasses = (
  ...classes: (string | undefined | null | boolean)[]
) => {
  const filteredClasses = classes?.filter(Boolean)
  return filteredClasses?.join(' ')?.trim()
}
