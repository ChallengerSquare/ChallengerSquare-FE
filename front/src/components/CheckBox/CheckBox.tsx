import checkIcon from '@assets/svgs/signup/check.svg'
import uncheckIcon from '@assets/svgs/signup/uncheck.svg'
import styles from './CheckBox.module.scss'

interface CheckBoxProps {
  description: string
  isCheck: boolean
  handleCheckBox: () => void
}

const CheckBox = ({ description, isCheck, handleCheckBox }: CheckBoxProps) => {
  return (
    <>
      <div className={styles.container}>
        <div>{description}</div>
        <img
          src={isCheck ? checkIcon : uncheckIcon}
          alt={isCheck ? 'check' : 'uncheck'}
          className={styles.checkbox}
          onClick={handleCheckBox}
        />
      </div>
    </>
  )
}

export default CheckBox
