import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import Button from '@/components/Button/Button'
import { participateContest } from '@/services/contest'
import { ParticipateTeamRequest } from '@/types/api'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './ResultModal.module.scss'

interface ParticipateTeamProps {
  isOpen: boolean
  handleClose: () => void
  data: ParticipateTeamRequest | null
}

const ResultModal = ({ isOpen, handleClose, data }: ParticipateTeamProps) => {
  const participateCompetition = useMutation(participateContest, {
    onSuccess: (response) => {
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload()
      }
      handleClose()
      window.close()
    },
    onError: (error) => {
      console.error('참가 등록 실패:', error)
      alert('참가 등록에 실패하였습니다.')
    },
  })

  const handleData = () => {
    if (data) participateCompetition.mutate(data)
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={400}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>참가신청하시겠습니까?</div>
        </div>
        <div className={styles.footer}>
          <Button variation="purple default" width={80} onClick={handleData}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ResultModal
