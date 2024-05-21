import useStep from '@hooks/useStep'
import Navbar from '@components/Navbar/Navbar'
import Stepper from '@components/Stepper/Stepper'
import Footer from '@/components/Footer/Footer'
import SelectTeam from './SelectTeam/SelectTeam'
import CompetitionForm from './CompetitionForm/CompetitionForm'
import Reward from './Reward/Reward'
import Promotion from './Promotion/Promotion'
import styles from './CreateCompetition.module.scss'

const CreateCompetition = () => {
  const { step, nextStep, prevStep } = useStep()

  const stepsConfig = [
    { name: '팀 선택', component: <SelectTeam nextStep={nextStep} /> },
    { name: '개최 정보 입력', component: <CompetitionForm prevStep={prevStep} nextStep={nextStep} /> },
    { name: '시상 정보 입력(선택)', component: <Reward prevStep={prevStep} nextStep={nextStep} /> },
    { name: '홍보글 작성', component: <Promotion prevStep={prevStep} /> },
  ]

  return (
    <>
      <div className={styles.background}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>대회 개최하기</div>
          <div className={styles.content}>
            <Stepper activeStep={step} steps={stepsConfig.map((step) => step.name)} />
          </div>
          <div className={styles['main-box']}>{stepsConfig[step].component}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default CreateCompetition
