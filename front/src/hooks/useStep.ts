import { useState } from 'react'

interface useStepReturn {
  step: number
  nextStep: () => void
  prevStep: () => void
}

const useStep = (steps: string[]) => {
  const [step, setStep] = useState(0)

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return {
    step,
    nextStep,
    prevStep,
  }
}

export default useStep
