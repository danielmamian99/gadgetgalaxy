export interface TablePaginationProps {
  className?: string
  defaultPage?: number
  totalPages: number
  value?: number
  basePath?: string
  prefetch?: boolean
  onPageChange: (page: number) => void
}
