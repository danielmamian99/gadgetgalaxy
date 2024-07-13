const PAGE_RANGE = 1

export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const pages: number[] = []

  let startPage = Math.max(1, currentPage - PAGE_RANGE)
  let endPage = Math.min(totalPages, currentPage + PAGE_RANGE)

  if (currentPage === 1 + (PAGE_RANGE + 1)) {
    startPage -= 1
  }

  if (currentPage === totalPages - (PAGE_RANGE + 1)) {
    endPage += 1
  }

  const showDotsStart = currentPage > 1 + (PAGE_RANGE + 1)
  const showDotsEnd = totalPages - currentPage > PAGE_RANGE + 1

  if (showDotsStart) {
    pages.push(1)
    pages.push(-1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (showDotsEnd) {
    pages.push(-1)
    pages.push(totalPages)
  }

  return pages
}
