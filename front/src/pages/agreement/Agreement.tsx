import Navbar from '@components/Navbar/Navbar'
import Stepper from '@components/Stepper/Stepper'
import Terms from './Terms'
import styles from './Agreement.module.scss'

const Agreement = () => {
  const stepArr = ['약관동의', '정보 입력', '가입 완료']
  return (
    <>
      <div className={styles.background}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>회원가입</div>
          {/* 여기서부터 컴포넌트 교체 */}
          <div>
            <Terms steps={stepArr} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Agreement
