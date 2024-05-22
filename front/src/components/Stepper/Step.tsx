import Icon from '@assets/svgs/step/done.svg'
import styles from './Step.module.scss'

interface StepProps {
  label: number
  description: string
  isActive: boolean
  isPrevious: boolean
}

const Step = ({ label, description, isActive, isPrevious }: StepProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.step} ${isActive ? styles.active : isPrevious ? styles.previous : null}`}>
          {isPrevious ? <img src={Icon} alt="Check" className={styles.icon} /> : label}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </>
  )
}

export default Step
