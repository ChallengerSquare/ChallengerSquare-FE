import { useState } from 'react'

const useStep = () => {
  const [step, setStep] = useState<number>(0)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return {
    step,
    nextStep,
    prevStep,
  }
}

export default useStep
