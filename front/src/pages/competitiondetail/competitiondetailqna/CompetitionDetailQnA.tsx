import React, { useState, useEffect } from 'react'
import { QnARequset, QnAResponse } from '@/types/competition'
import { getCompetitionQnA, updateCompetitionQnA } from '@/services/qna'
import Button from '@/components/Button/Button'
import Pagination from '@/components/Pagination/Pagination'
import styles from '@/pages/competitiondetail/competitiondetailqna/CompetitionDetailQnA.module.scss'

interface CompetitionDetailQAProps {
  contestId: number
  isLeader: boolean
}

// const dummyQnAs: QnAResponse[] = [
//   {
//     qnaId: 1,
//     title: 'How to reset password?',
//     content: 'I forgot my password, how can I reset it?',
//     writer: 'John Doe',
//     answer: 'You can reset your password by clicking on "Forgot Password" at the login screen.',
//     createdAt: '2023-01-01T10:00:00Z',
//     editText: '',
//   },
//   {
//     qnaId: 2,
//     title: 'How to change email address?',
//     content: 'How do I update my email address in my account settings?',
//     writer: 'Jane Smith',
//     answer: '',
//     createdAt: '2023-02-15T12:30:00Z',
//     editText: '',
//   },
//   {
//     qnaId: 3,
//     title: 'How to delete my account?',
//     content: 'What is the procedure to permanently delete my account?',
//     writer: 'Michael Johnson',
//     answer: 'To delete your account, please contact our support team.',
//     createdAt: '2023-03-20T09:45:00Z',
//     editText: '',
//   },
//   {
//     qnaId: 4,
//     title: 'How to contact support?',
//     content: 'I need help with my account, how can I reach the support team?',
//     writer: 'Emily Davis',
//     answer: 'You can contact our support team via the "Contact Us" page.',
//     createdAt: '2023-04-05T14:00:00Z',
//     editText: '',
//   },
//   {
//     qnaId: 5,
//     title: 'How to update profile picture?',
//     content: 'How can I upload a new profile picture?',
//     writer: 'David Wilson',
//     answer: 'You can update your profile picture in the account settings under "Profile".',
//     createdAt: '2023-05-10T11:15:00Z',
//     editText: '',
//   },
//   {
//     qnaId: 6,
//     title: 'How to enable two-factor authentication?',
//     content: 'What steps are required to enable two-factor authentication?',
//     writer: 'Linda Martinez',
//     answer: 'You can enable two-factor authentication in the account settings under "Security".',
//     createdAt: '2023-06-25T08:30:00Z',
//     editText: '',
//   },
// ]

const CompetitionDetailQA = ({ contestId, isLeader }: CompetitionDetailQAProps) => {
  const sizeofPage = 3
  const limitofPagenation = 5
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [totalItem, setTotalItem] = useState<number>(0)
  const [QnAs, setQnAs] = useState<QnAResponse[]>([])

  useEffect(() => {
    // setQnAs(dummyQnAs)
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
    const features = 'toolbar=no,menubar=no,width=700,height=700,left=100,top=100'
    window.open(`/competition/inquire/${contestId}`, '_blank', features)
  }

  return (
    <div className={styles.container}>
      {QnAs.length === 0 ? (
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
                      <span className={styles.name}>{`${QA.writer}**`}</span>
                      <span className={styles.date}> {QA.createdAt} </span>
                    </div>
                    <div>{QA.answer != null ? '답변완료' : '답변대기'}</div>
                  </div>
                  <div className={styles.content_wrap}>
                    <div className={styles.title}> {`${QA.title}`} </div>
                    <div className={styles.content}> {`${QA.content}`} </div>
                  </div>
                  {QA.answer != null && QA.answer != '' ? <p className={styles.answer}> ➥ {QA.answer} </p> : ''}
                  {isLeader === false ? (
                    <div className={styles.comment}>
                      <input
                        type="text"
                        value={QA.editText}
                        onChange={(event) => handleChange(QA.qnaId, event)}
                        onKeyDown={(event) => handleKeyDown(QA.qnaId, event)}
                        placeholder={QA.answer}
                      />
                      {QA.answer && QA.editText ? (
                        <Button variation="purple" onClick={() => handleOnClick(QA.qnaId)}>
                          {'수정'}
                        </Button>
                      ) : (
                        ''
                      )}
                      {QA.answer && !QA.editText ? (
                        <Button variation="gray" onClick={() => handleOnClick(QA.qnaId)}>
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

export default CompetitionDetailQA
