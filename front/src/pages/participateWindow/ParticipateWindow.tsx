import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@/components/Button/Button'
import { CreateCompetitionDto } from '@/types/api'
import logoIcon from '@svgs/logo/challSv2.svg'
import styles from './ParticipateWindow.module.scss'

const ParticipateWindow = () => {
  const { competitionId } = useParams()
  const handleData = () => {
    console.log('Data handled')
  }

  return (
    <>
      <div className={styles.modal_header}>
        <img src={logoIcon} alt="logo" className={styles.logo} />
        <div className={styles.modal_header_title}>{competitionId}</div>
      </div>
      <div className={styles.modal_container}>
        <div className={styles.modal_form}>
          <div className={styles.element}>
            <div className={styles.label}>{competitionId}</div>
            <div className={styles.content}>흐흐</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Button variation="purple default" onClick={handleData}>
            예
          </Button>
        </div>
        <div>
          <Button variation="white default" onClick={handleData}>
            아니오
          </Button>
        </div>
      </div>
    </>
  )
}
export default ParticipateWindow
