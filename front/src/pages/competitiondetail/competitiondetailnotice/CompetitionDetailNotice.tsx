import { useState, useEffect } from 'react'
import { Page } from '@/types/api'
import { NoticeRequset, NoticeResponse } from '@/types/competition'
import { getCompetitionNotice } from '@/services/notice'
import Pagination from '@/components/Pagination/Pagination'
import styles from './CompetitionDetailNotice.module.scss'

interface CompetitionDetailNoticeProps {
  contestId: number
  isLeader: boolean
}

const CompetitionDetailNotice = ({ contestId, isLeader }: CompetitionDetailNoticeProps) => {
  const sizeofPage = 7
  const limitofPagenation = 5
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [totalItem, setTotalItem] = useState<number>(0)
  const [notices, setNotices] = useState<NoticeResponse[]>([
    {
      title: '',
      content: '',
      date: '',
    },
  ])

  useEffect(() => {
    getCompetitionNoticeData(0)
  }, [])

  const PageChange = (page: number) => {
    setCurrentPage(page)
    getCompetitionNoticeData(page - 1)
  }

  const getCompetitionNoticeData = (id: number) => {
    const competitionNoticeParams: NoticeRequset = {
      id: contestId,
      size: sizeofPage,
      page: id,
    }
    getCompetitionNotice(competitionNoticeParams).then(({ data }) => {
      setNotices(data.content)
      setCurrentPage(data.pageable.pageNumber + 1)
      setTotalPage(data.totalPages)
      setTotalItem(data.totalElements)
    })
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
              총 <span>{totalItem}개</span>의 공지사항이 있습니다.
            </p>
            <button type="button">+ 작성하기</button>
          </div>
          <div className={styles.body}>
            <ul>
              {notices.map((notices, index) => (
                <li key={index} className={styles.content}>
                  <button type="button" onClick={() => handleToggleDescription(index)}>
                    <div className={styles.summary}>
                      <div className={styles.text}>
                        <span className={styles.index}>{(currentPage - 1) * 5 + (index + 1)}</span>
                        <span className={styles.title}> {notices.title} </span>
                        <span className={styles.date}> {notices.date} </span>
                      </div>
                      <p>{openIndex === index ? '-' : '+'}</p>
                    </div>
                  </button>
                  {openIndex === index && (
                    <div className={styles.description}>
                      <p className={styles.index}>{''}</p>
                      <p className={styles.title}> {notices.content} </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Pagination limit={limitofPagenation} page={currentPage} totalPage={totalPage} onPageChange={PageChange} />
        </div>
      )}
    </div>
  )
}

export default CompetitionDetailNotice
