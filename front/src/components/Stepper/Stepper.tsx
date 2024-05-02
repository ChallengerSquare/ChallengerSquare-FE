// Stepper.tsx
import React, { Fragment } from 'react'
import Step from './Step' // Step 컴포넌트 임포트
import styles from './Stepper.module.scss'

interface StepperProps {
  currentStep: number
}

const Stepper = ({ currentStep }: StepperProps) => {
  const steps = ['약관 동의', '정보 입력', '가입 완료'] // 스텝 라벨 배열

  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <Fragment key={step}>
          <Step label={`${index + 1}`} isActive={index === currentStep} />
          {index < steps.length - 1 ? <div className={styles.line} /> : null}
        </Fragment>
      ))}
    </div>
  )
}

export default Stepper
