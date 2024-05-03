// Stepper.tsx
import React, { Fragment } from 'react'
import Step from './Step' // Step 컴포넌트 임포트
import styles from './Stepper.module.scss'

interface StepperProps {
  activeStep: number
  steps: string[]
}

const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <>
          <Step label={index + 1} description={step} isActive={index === activeStep} />
          {index < steps.length - 1 ? <div className={styles.line} /> : null}
        </>
      ))}
    </div>
  )
}

export default Stepper
