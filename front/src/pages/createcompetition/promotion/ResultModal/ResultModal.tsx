import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button/Button'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './ResultModal.module.scss'

interface CompetitionModalProps {
  isOpen: boolean
  handleClose: () => void
  contestId: number | null
}

const ResultModal = ({ isOpen, handleClose, contestId }: CompetitionModalProps) => {
  const navigate = useNavigate()

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} width={550}>
        <div className={styles.modal_header}>
          <img src={logoIcon} alt="logo" className={styles.logo} />
          <div className={styles.modal_header_title}>대회가 등록되었습니다.</div>
        </div>
        <div className={styles.footer}>
          <Button variation="purple default" width={160} onClick={() => navigate(`/competition/detail/${contestId}`)}>
            확인하러가기
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ResultModal
