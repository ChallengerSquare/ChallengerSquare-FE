import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './ConfirmModal.module.scss'

interface ConfirmProps {
  isOpen: boolean
  handleClose: () => void
  title: string
  handleData?: () => void
}

const ConfirmModal = ({ isOpen, handleClose, title, handleData }: ConfirmProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={500}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>{title}</div>
        </div>
        <div className={styles.footer}>
          <div>
            <Button variation="purple default" width={90} onClick={handleData}>
              네
            </Button>
          </div>
          <div>
            <Button variation="white default" width={90} onClick={handleClose}>
              아니오
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ConfirmModal
