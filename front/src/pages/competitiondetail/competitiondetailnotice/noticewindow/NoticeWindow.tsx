import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useParams, Link } from 'react-router-dom'
import { getTeamsinLeader } from '@/services/member'
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal'
import Button from '@/components/Button/Button'
import { registerNotice } from '@/services/notice'
import { RegisterNoticeRequest } from '@/types/api'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './NoticeWindow.module.scss'

const ParticipateWindow = () => {
  const { competitionId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [formTitle, setFormTitle] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [request, setRequest] = useState<RegisterNoticeRequest | null>(null)

  const handleData = () => {
    if (!formTitle) alert('제목을 입력해주세요.')
    else if (!text) alert('내용을 입력해주세요')
    const requestDto: RegisterNoticeRequest = {
      title: formTitle,
      content: text,
      contestId: Number(competitionId),
    }
    setRequest(requestDto)
    setIsOpen(true)
  }

  const registNotice = useMutation(registerNotice, {
    onSuccess: (response) => {
      console.log('공지사항 등록 성공')
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload()
      }
      handleClose()
      window.close()
    },
    onError: (error) => {
      console.error('공지사항 등록 실패:', error)
      alert('공지사항 등록에 실패하였습니다.')
    },
  })
  const handleRegistNotice = () => {
    if (request) registNotice.mutate(request)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div className={styles.header}>
        <img src={logoIcon} alt="logo" className={styles.logo} />
        <div className={styles.header_title}>공지사항 등록</div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>제목</div>
        <div className={styles.content}>
          <input
            type="text"
            onChange={(item) => {
              setFormTitle(item.target.value)
            }}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>내용</div>
        <textarea
          className={styles.form}
          onChange={(item) => {
            setText(item.target.value)
          }}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.btn_submit}>
          <Button variation="purple" width={120} onClick={handleData}>
            등록하기
          </Button>
          <ConfirmModal
            isOpen={isOpen}
            handleClose={handleClose}
            title="등록하시겠습니까?"
            handleData={handleRegistNotice}
          />
        </div>
        <div className={styles.btn_cancel}>
          <Button variation="white" width={120} onClick={window.close}>
            취소하기
          </Button>
        </div>
      </div>
    </>
  )
}
export default ParticipateWindow
