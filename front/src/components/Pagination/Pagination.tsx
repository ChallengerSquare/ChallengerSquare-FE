import { useState } from 'react'
import styles from './Pagination.module.scss'

interface PaginationProps {
  limit: number
  page: number
  totalPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({ limit, page, totalPage, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page)
  const [firstNumOfPage, setFirstNumOfPage] = useState(1)
  const [lastNumOfPage, setLastNumOfPage] = useState(4)

  const pageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const nextPageChange = () => {
    pageChange(firstNumOfPage + limit)
    setLastNumOfPage(firstNumOfPage + limit)
    setFirstNumOfPage((prePage) => prePage + limit)
  }

  const prePageChange = () => {
    pageChange(firstNumOfPage - 1)
    setLastNumOfPage(firstNumOfPage - limit)
    setFirstNumOfPage((prePage) => prePage - limit)
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
      {Array.from({ length: Math.min(limit, totalPage - firstNumOfPage + 1) }, (_, i) => {
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
      {firstNumOfPage + limit > totalPage ? (
        ''
      ) : (
        <button type="button" onClick={() => nextPageChange()} disabled={firstNumOfPage + limit > totalPage}>
          ›
        </button>
      )}
    </div>
  )
}

export default Pagination
