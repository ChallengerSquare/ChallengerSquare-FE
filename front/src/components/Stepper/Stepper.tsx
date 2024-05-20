import Step from './Step'
import styles from './Stepper.module.scss'

interface StepperProps {
  activeStep: number
  steps: string[]
}

const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <div key={step} className={styles.stepWithLine}>
          <Step label={index + 1} description={step} isActive={index === activeStep} isPrevious={index < activeStep} />
          {index < steps.length - 1 ? <div className={styles.line} /> : null}
        </div>
      ))}
    </div>
  )
}

export default Stepper
