import React from 'react'
import styles from './Step.module.scss'

interface StepProps {
  label: number
  description: string
  isActive: boolean
}

const Step = ({ label, description, isActive }: StepProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.step} ${isActive ? styles.active : null}`}>{label}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </>
  )
}

export default Step
