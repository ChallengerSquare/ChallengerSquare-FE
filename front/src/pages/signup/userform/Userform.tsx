/* eslint-disable react/jsx-curly-brace-presence */
import { useEffect, useState } from 'react'
import Calendar from '@components/Calendar/Calendar'
import HelpButton from '@svgs/help_button.svg'
import Button from '@/components/Button/Button'
import loadPostcode from '@services/postcode'
import styles from './Userform.module.scss'

interface stepProps {
  prevStep: () => void
  nextStep: () => void
}
const Userform = ({ prevStep, nextStep }: stepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [address, setAddress] = useState({
    postcode: '',
    address: '',
    detailAddress: '',
    extraAddress: '',
  })
  return (
    <>
      <div className={styles['main-box']}>
        <div className={styles.header}>
          <div className={styles.bold}>&nbsp; &nbsp; &nbsp; &nbsp; 개인정보 입력</div>
          <div className={styles.side}>
            <span className={styles.highlight}>*</span> &nbsp;필수입력사항
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.input}>
            <div className={styles.label}>
              <span className={styles.highlight}>*</span> &nbsp; 이름
            </div>
            <input type="text" className={styles['input-box']} placeholder="이름을 입력하세요." />
          </div>
          <div className={styles.input}>
            <div className={styles.label}>
              <span className={styles.highlight}>*</span> &nbsp; 생년월일
            </div>
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className={styles.input}>
            <div className={styles.label}>
              <span className={styles.highlight}>*</span> &nbsp; 연락처
            </div>
            <input type="text" className={styles['input-box']} placeholder="000-000-000" />
            <div className={styles.help}>
              <img src={HelpButton} alt="도움말" />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.label}>
              <span className={styles.highlight}>*</span> &nbsp; 주소
            </div>
            <input
              type="text"
              value={address.postcode}
              className={styles['input-box']}
              placeholder="우편번호"
              readOnly
            />
            <Button variation="purple postcode" onClick={() => loadPostcode(setAddress)}>
              주소검색
            </Button>
          </div>
          <div>
            <input
              type="text"
              value={address.address}
              className={styles['road-address']}
              placeholder="도로명 주소"
              readOnly
            />
          </div>
          <div className={styles.flex}>
            <input
              type="text"
              value={address.extraAddress}
              className={styles['detail-address']}
              placeholder="상세 주소"
              readOnly
            />
            <input
              type="text"
              value={address.detailAddress}
              className={styles['dong-address']}
              placeholder="(직접 입력)"
              onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
            />
          </div>
          <br />
        </div>
      </div>
    </>
  )
}

export default Userform
