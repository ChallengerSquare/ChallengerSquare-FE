import React, { useState, useEffect } from 'react'
import { QnARequset, QnAResponse } from '@/types/competition'
import { getCompetitionQnA, updateCompetitionQnA } from '@/services/qna'
import Button from '@/components/Button/Button'
import Pagination from '@/components/Pagination/Pagination'
import styles from './QnA.module.scss'

interface CompetitionDetailQAProps {
  contestId: number
  isOwnerTeamMember: boolean
}

const QnA = ({ contestId, isOwnerTeamMember }: CompetitionDetailQAProps) => {
  const sizeofPage = 3
  const limitofPagenation = 5
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [totalItem, setTotalItem] = useState<number>(0)
  const [QnAs, setQnAs] = useState<QnAResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getCompetitionQnAData(0)
  }, [])

  const getCompetitionQnAData = (id: number) => {
    const competitionQnAParams: QnARequset = {
      id: contestId,
      size: sizeofPage,
      page: id,
    }
    getCompetitionQnA(competitionQnAParams).then(({ data }) => {
      setQnAs(data.content)
      setCurrentPage(data.pageable.pageNumber + 1)
      setTotalPage(data.totalPages)
      setTotalItem(data.totalElements)
      setLoading(false)
    })
  }

  const PageChange = (page: number) => {
    setCurrentPage(page)
    getCompetitionQnAData(page - 1)
  }

  const handleChange = (qnaId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQAs = QnAs.map((QA) => (QA.qnaId === qnaId ? { ...QA, editText: event.target.value } : QA))
    setQnAs(updatedQAs)
  }

  const handleKeyDown = (qnaId: number, event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnClick(qnaId)
    }
  }

  const handleOnClick = (qnaId: number) => {
    const updatedQAs = QnAs.map((QA) => (QA.qnaId === qnaId ? { ...QA, answer: QA.editText, editText: '' } : QA))
    setQnAs(updatedQAs)
    postCompetitionQnAData(qnaId)
  }

  const postCompetitionQnAData = (id: number) => {
    const tempQAs = QnAs.find((qna) => qna.qnaId === id)
    if (tempQAs) updateCompetitionQnA(id, tempQAs.editText)
  }

  const handleNewPost = () => {
    // QnA 작성 api
    const features = 'toolbar=no,menubar=no,width=800,height=700,left=100,top=100'
    window.open(`/competition/inquire/${contestId}`, '_blank', features)
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.empty}>{''}</div>
      ) : QnAs.length === 0 ? (
        <div className={styles.empty}>
          <div>
            <p> 등록된 Q&A가 없습니다. </p>
            <button type={'button'} onClick={handleNewPost}>
              {'작성하러 가기 >'}
            </button>
          </div>
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
              총 <span>{totalItem}개</span>의 문의글이 있습니다.
            </p>
            <button type="button" onClick={handleNewPost}>
              + 문의하기
            </button>
          </div>
          <div className={styles.body}>
            <ul>
              {QnAs.map((QA) => (
                <li key={QA.qnaId} className={styles.QA}>
                  <div className={styles.info}>
                    <div>
                      <span className={styles.name}>{`${QA.writer}`}</span>
                      <span className={styles.date}> {QA.createdAt} </span>
                    </div>
                    <div>{QA.answer != null ? '답변완료' : '답변대기'}</div>
                  </div>
                  <div className={styles.content_wrap}>
                    <div className={styles.title}> {`${QA.title}`} </div>
                    <div className={styles.content}> {`${QA.content}`} </div>
                  </div>
                  {QA.answer != null && QA.answer != '' ? <p className={styles.answer}> ➥ {QA.answer} </p> : ''}
                  {isOwnerTeamMember === true ? (
                    <div className={styles.comment}>
                      <input
                        type="text"
                        value={QA.editText}
                        onChange={(event) => handleChange(QA.qnaId, event)}
                        onKeyDown={(event) => handleKeyDown(QA.qnaId, event)}
                        // placeholder={QA.answer}
                      />
                      {QA.answer && QA.editText ? (
                        <Button variation="purple" onClick={() => handleOnClick(QA.qnaId)}>
                          {'수정'}
                        </Button>
                      ) : (
                        ''
                      )}
                      {QA.answer && !QA.editText ? (
                        <Button variation="gray" disabled={true} onClick={() => handleOnClick(QA.qnaId)}>
                          {'수정'}
                        </Button>
                      ) : (
                        ''
                      )}
                      {QA.answer ? (
                        ''
                      ) : (
                        <Button variation="purple" onClick={() => handleOnClick(QA.qnaId)}>
                          {'작성'}
                        </Button>
                      )}
                    </div>
                  ) : (
                    ''
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

export default QnA
