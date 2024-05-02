import Navbar from '@components/Navbar/Navbar'
import Stepper from '@components/Stepper/Stepper'
import styles from './Agreement.module.scss'

const Agreement = () => {
  return (
    <>
      <div className={styles.background}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles['sign-up']}>{'회원가입'}</div>
          <div>
            <Stepper currentStep={0} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Agreement
