import useCheckButton from '@/hooks/useCheckButton'
import checkIcon from '@svgs/agreement/check.svg'
import uncheckIcon from '@svgs/agreement/uncheck.svg'
import styles from './CheckButton.module.scss'

interface CheckButtonProps {
  description: string
}

const CheckButton = ({ description }: CheckButtonProps) => {
  const { check, handleCheck } = useCheckButton()

  return (
    <>
      <div className={styles.container}>
        <div>{description}</div>
        <button onClick={handleCheck} type="button" className={styles.btn}>
          <img src={check ? checkIcon : uncheckIcon} alt="check" />
        </button>
      </div>
    </>
  )
}

export default CheckButton
