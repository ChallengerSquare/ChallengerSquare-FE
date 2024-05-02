import React from 'react'
import styles from './Step.module.scss'

interface StepProps {
  label: string
  isActive: boolean
}

const Step = ({ label, isActive }: StepProps) => {
  return <div className={`${styles.step} ${isActive ? styles.active : ''}`}>{label}</div>
}

export default Step
