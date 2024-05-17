import { useState } from 'react'
import { useMutation } from 'react-query'
import Button from '@/components/Button/Button'
import { categorys } from '@/types/category'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import { CreateCompetitionDto, CompetitionCreateRequestDto } from '@/types/api'
import { registerCompetition } from '@/services/contest'
import { useResetRecoilState } from 'recoil'
import { competitionForm, formButtonState } from '../../store'
import ResultModal from '../ResultModal/ResultModal'
import styles from './CompetitionModal.module.scss'

interface CompetitionModalProps {
  data: CreateCompetitionDto
  isOpen: boolean
  handleClose: () => void
}

const CompetitionModal = ({ data, isOpen, handleClose }: CompetitionModalProps) => {
  const [isResult, setIsResult] = useState<boolean>(false)
  const [contestId, setContestId] = useState<number | null>(null)
  const resetRecoilState = useResetRecoilState(competitionForm)
  const resetButtonState = useResetRecoilState(formButtonState)
  const competition: CompetitionCreateRequestDto = data.contestCreateRequestDto
  const registerData = useMutation(registerCompetition, {
    onSuccess: (response) => {
      setContestId(response.data.contestId)
      setIsResult(true)
      resetRecoilState()
      resetButtonState()
      handleClose()
    },
    onError: (error) => {
      console.error('대회 등록 실패:', error)
      alert('대회 등록에 실패하였습니다.')
    },
  })

  const base64ToBlob = (base64: string, mime: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mime })
  }

  const handleFormData = () => {
    const competitionDto = { ...competition }
    if (!competitionDto.contestLocation) competitionDto.contestLocation = '온라인'
    const formData = new FormData()
    if (data.contestImage && data.contestImage.startsWith('data:image')) {
      const base64Response = data.contestImage.split(',')[1]
      const blob = base64ToBlob(base64Response, 'image/jpeg') // MIME type을 정확히 알 경우 사용
      formData.append('contestImage', blob, 'competition-image.jpg')
    }
    formData.append(
      'contestCreateRequestDto',
      new Blob([JSON.stringify(competitionDto)], {
        type: 'application/json',
      }),
    )

    registerData.mutate(formData)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>대회를 등록하시겠습니까?</div>
        </div>
        <div className={styles.modal_container}>
          <div className={styles.modal_form}>
            <div className={styles.element}>
              <div className={styles.label}>포스터 : </div>
              <div className={styles.content}>
                <img src={data.contestImage} alt="Contest Poster" />
              </div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>카테고리 : </div>
              <div className={styles.content}>
                {competition.contestCategory ? categorys[parseInt(competition.contestCategory, 10) - 1].category : ''}
              </div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>대회명 : </div>
              <div className={styles.content}>{competition.contestTitle}</div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>장소 : </div>
              <div className={styles.content}>
                {competition.contestLocation ? competition.contestLocation : '온라인'}
              </div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>모집 기간 : </div>
              <div className={styles.content}>
                {competition.registrationPeriod.start} ~&nbsp;
                {competition.registrationPeriod.end}
              </div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>대회 기간 : </div>
              <div className={styles.content}>
                {competition.contestPeriod.start} ~&nbsp;
                {competition.contestPeriod.end}
              </div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>모집 인원 : </div>
              <div className={styles.content}>{competition.contestRegistrationNum} 명</div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>참가비 : </div>
              <div className={styles.content}> {competition.contestFee} 원</div>
            </div>
            <div className={styles.element}>
              <div className={styles.label}>수상내역 : </div>
              <div className={styles.content}>
                <div className={styles.reward}>
                  {competition.contestAwards.map((item, index) => (
                    <div>
                      {item.awardsName}({item.awardsCount}) : {item.awardsPrize}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div>
            <Button variation="purple default" onClick={handleFormData}>
              예
            </Button>
          </div>
          <div>
            <Button variation="white default" onClick={handleClose}>
              아니오
            </Button>
          </div>
        </div>
      </Modal>
      <ResultModal isOpen={isResult} handleClose={handleClose} contestId={contestId} />
    </>
  )
}

export default CompetitionModal
