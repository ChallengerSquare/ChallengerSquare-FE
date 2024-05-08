import { useState } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  limit: number
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ limit, page, totalPages, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page)
  const [firstNumOfPage, setFirstNumOfPage] = useState(1)
  const [lastNumOfPage, setLastNumOfPage] = useState(5)

  const pageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const nextPageChange = () => {
    pageChange(firstNumOfPage + limit)
    setFirstNumOfPage((prePage) => prePage + limit)
    setLastNumOfPage((prePage) => prePage + limit)
  }

  const prePageChange = () => {
    pageChange(lastNumOfPage - limit)
    setFirstNumOfPage((prePage) => prePage - limit)
    setLastNumOfPage((prePage) => prePage - limit)
  }

  return (
    <div className={styles.tail}>
      {currentPage - limit < 1 ? (
        ''
      ) : (
        <button type="button" onClick={() => prePageChange()} disabled={currentPage - limit < 1}>
          ‹
        </button>
      )}
      {Array.from({ length: Math.min(limit, totalPages - firstNumOfPage + 1) }, (_, i) => {
        const pageNumber = firstNumOfPage + i
        return (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? styles.active : styles.inactive}
            type="button"
            onClick={() => pageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })}
      {firstNumOfPage + limit >= totalPages ? (
        ''
      ) : (
        <button type="button" onClick={() => nextPageChange()} disabled={firstNumOfPage + limit >= totalPages}>
          ›
        </button>
      )}
    </div>
  )
}

export default Pagination
