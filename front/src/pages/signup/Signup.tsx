import Navbar from '@components/Navbar/Navbar'
import Stepper from '@components/Stepper/Stepper'
import useStep from '@hooks/useStep'
import styles from './Signup.module.scss'
import Userform from './Userform/Userform'
import Complete from './Complete/Complete'
import Terms from './terms/Terms'

const Signup = () => {
  const { step, nextStep, prevStep } = useStep()

  const stepsConfig = [
    { name: '약관 동의', component: <Terms nextStep={nextStep} /> },
    { name: '정보 입력', component: <Userform prevStep={prevStep} nextStep={nextStep} /> },
    { name: '가입 완료', component: <Complete /> },
  ]

  return (
    <>
      <div className={styles.background}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>회원가입</div>
          <div className={styles.content}>
            <Stepper activeStep={step} steps={stepsConfig.map((step) => step.name)} />
            {stepsConfig[step].component}
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
