import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './CreateTeamModal.module.scss'

interface CompetitionModalProps {
  isOpen: boolean
  handleClose: () => void
}

const CreateTeamModal = ({ isOpen, handleClose }: CompetitionModalProps) => {
  const navigate = useNavigate()

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={550}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>팀이 등록되었습니다.</div>
        </div>
        <div className={styles.footer}>
          <Button variation="purple default" width={160} onClick={() => navigate(`/mypage`)}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default CreateTeamModal
