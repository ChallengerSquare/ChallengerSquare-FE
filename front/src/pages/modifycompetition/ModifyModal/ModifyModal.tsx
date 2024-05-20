import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './ModifyModal.module.scss'

interface CompetitionModalProps {
  isOpen: boolean
  handleClose: () => void
  contestId: string | undefined
}

const ModifyModal = ({ isOpen, handleClose, contestId }: CompetitionModalProps) => {
  const navigate = useNavigate()

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={550}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>변경사항이 적용되었습니다.</div>
        </div>
        <div className={styles.footer}>
          <Button variation="purple default" width={80} onClick={() => navigate(-1)}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ModifyModal
