export interface TablePaginationProps {
  className?: string
  defaultPage?: number
  totalPages: number
  value?: number
  onPageChange: (page: number) => void
}
