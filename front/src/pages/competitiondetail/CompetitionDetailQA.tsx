import React, { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination/Pagination'
import styles from './CompetitionDetailQA.module.scss'

interface ListItem {
  qnaId: number
  name: string
  title: string
  date: string
  content: string
  answer?: string
}

const CompetitionDetailQA = () => {
  const limit = 5
  const [QAs, setQAs] = useState<ListItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [comment, setComment] = useState('')

  const dummyData: ListItem[] = [
    {
      qnaId: 1,
      name: '***',
      title: '첫 번째 질문',
      date: '2024-05-05',
      content: '이것은 첫 번째 질문에 대한 내용입니다.',
    },
    {
      qnaId: 2,
      name: '***',
      title: '두 번째 질문',
      date: '2024-05-06',
      content: '이것은 두 번째 질문에 대한 내용입니다.',
      answer: '두 번째 질문에 대한 답변입니다.',
    },
    {
      qnaId: 3,
      name: '***',
      title: '세 번째 질문',
      date: '2024-05-07',
      content: '이것은 세 번째 질문에 대한 내용입니다.',
      answer: '세 번째 질문에 대한 답변입니다.',
    },
    {
      qnaId: 4,
      name: '***',
      title: '네 번째 질문',
      date: '2024-05-08',
      content: '이것은 네 번째 질문에 대한 내용입니다.',
      answer: '네 번째 질문에 대한 답변입니다.',
    },
    {
      qnaId: 5,
      name: '***',
      title: '다섯 번째 질문',
      date: '2024-05-09',
      content: '이것은 다섯 번째 질문에 대한 내용입니다.',
    },
  ]

  useEffect(() => {
    // const fetchData = async () => {
    //     const response = await fetch(`https://api.example.com/items?page=${currentPage}&size=10`)
    //     setNotices(response.json().data)
    //     setTotalPages(response.json().totalPages)
    // }
    // fetchData()
    setQAs([...dummyData])
    setTotalPages(dummyData.length / limit)
  }, [])

  const PageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleKeyDown = (qnaId: number, event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const updatedQAs = QAs.map((QA) => (QA.qnaId === qnaId ? { ...QA, answer: comment } : QA))
      setQAs(updatedQAs)
    }
  }

  return (
    <div className={styles.container}>
      {QAs.length === 0 ? (
        <div className={styles.empty}>
          <p> 등록된 Q&A가 없습니다. </p>
        </div>
      ) : (
        <div className={styles.QAs}>
          <p className={styles.notice}>
            대회에 관련해서 궁금한 점이 있으면 자유롭게 남겨주세요.
            <br />
            참가비 환불 등 정확한 답변이 필요한 문의는 참가팀 대표 번호로 연락해 주시기를 바랍니다.
          </p>
          <div className={styles.header}>
            <p>
              총 <span>{QAs.length}개</span>의 문의글이 있습니다.
            </p>
            <button type="button">+ 문의하기</button>
          </div>
          <div className={styles.body}>
            <ul>
              {QAs.map((QA) => (
                <li key={QA.qnaId} className={styles.QA}>
                  <div className={styles.info}>
                    <div>
                      <span className={styles.name}> {QA.name} </span>
                      <span className={styles.date}> {QA.date} </span>
                    </div>
                    <div>{QA.answer != null ? '답변완료' : '답변대기'}</div>
                  </div>
                  <div className={styles.content}>
                    <span> {QA.content} </span>
                  </div>
                  {QA.answer != null ? <p className={styles.answer}> ➥ {QA.answer} </p> : ''}
                  {QA.answer != null ? (
                    ''
                  ) : (
                    <input
                      type="text"
                      onChange={handleChange}
                      onKeyDown={(event) => handleKeyDown(QA.qnaId, event)}
                      placeholder="글을 작성해주세요."
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Pagination limit={limit} page={1} totalPages={totalPages} onPageChange={PageChange} />
        </div>
      )}
    </div>
  )
}

export default CompetitionDetailQA
