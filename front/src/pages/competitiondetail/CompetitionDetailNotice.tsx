import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination/Pagination'
import styles from './CompetitionDetailNotice.module.scss'

interface ListItem {
  id: number
  title: string
  date: string
  description?: string
}

const CompetitionDetailNotice = () => {
  const [notices, setNotices] = useState<ListItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch(`https://api.example.com/items?page=${currentPage}&size=10`)
    //   const data = await response.json()
    //   setNotices(data.posts)
    //   setTotalPages(data.totalPages)
    // }
    // fetchData()
    const initialItems: ListItem[] = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `Item ${index + 1}`,
      date: `2024-04-${Math.floor(Math.random() * 30) + 1}`,
      description: `Description for item ${Math.floor(Math.random() * 100) + 1}`,
    }))
    setNotices([...initialItems])
    setTotalPages(Math.ceil(initialItems.length / 4)) // totalPages
  }, [currentPage])

  const PageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleToggleDescription = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div className={styles.container}>
      {notices.length === 0 ? (
        <div className={styles.empty}>
          <p> 등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className={styles.notices}>
          <div className={styles.header}>
            <p>
              총 <span>{notices.length}개</span>의 공지사항이 있습니다.
            </p>
            <button type="button">+ 작성하기</button>
          </div>
          <div className={styles.body}>
            <ul>
              {notices.map((notices) => (
                <li key={notices.id} className={styles.content}>
                  <button type="button" onClick={() => handleToggleDescription(notices.id)}>
                    <div className={styles.summary}>
                      <div className={styles.text}>
                        <span className={styles.index}> {notices.id} </span>
                        <span className={styles.title}> {notices.title} </span>
                        <span className={styles.date}> {notices.date} </span>
                      </div>
                      <p>{openIndex === notices.id ? '-' : '+'}</p>
                    </div>
                  </button>
                  {openIndex === notices.id && (
                    <div className={styles.description}>
                      <p> {notices.description} </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Pagination limit={5} page={1} totalPages={totalPages} onPageChange={PageChange} />
        </div>
      )}
    </div>
  )
}

export default CompetitionDetailNotice
