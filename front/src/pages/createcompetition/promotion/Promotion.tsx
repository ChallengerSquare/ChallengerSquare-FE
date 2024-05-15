import { useState, useRef, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { stepProps } from '@/types/step'
import Button from '@/components/Button/Button'
import CustomEditor from '@/components/Editor/CustomEditor'
import { CreateCompetitionDto } from '@/types/api'
import { competitionForm } from '../store'
import styles from './Promotion.module.scss'
import CompetitionModal from './CompetitionModal/CompetitionModal'

const Promotion = ({ prevStep }: stepProps) => {
  const form: CreateCompetitionDto = useRecoilValue(competitionForm)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const editorRef = useRef<{ handleStore: () => void }>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleOpen = () => {
    if (editorRef.current) {
      editorRef.current.handleStore()
    }
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.header}>대회 세부 내용을 작성해주세요.</div>
      <div className={styles.sub_header}>대회 내용, 이미지 첨부</div>
      <CustomEditor ref={editorRef} initialContent={form.contestCreateRequestDto.contestContent} />
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={prevStep}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="competition_submit_btn" onClick={handleOpen}>
            대회 등록
          </Button>
          <CompetitionModal data={form} isOpen={isOpen} handleClose={handleClose} />
        </div>
      </div>
    </>
  )
}

export default Promotion
