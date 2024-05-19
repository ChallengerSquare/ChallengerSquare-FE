import Button from '@/components/Button/Button'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './MyInfoModal.module.scss'

interface CompetitionModalProps {
  isOpen: boolean
  handleClose: () => void
}

const MyInfoModal = ({ isOpen, handleClose }: CompetitionModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={550}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>수정되었습니다.</div>
        </div>
        <div className={styles.footer}>
          <Button variation="purple default" width={160} onClick={handleClose}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default MyInfoModal
