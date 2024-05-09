/* eslint-disable react/jsx-curly-brace-presence */
import { useEffect, useState } from 'react'
import Calendar from '@components/Calendar/Calendar'
import HelpButton from '@svgs/help_button.svg'
import Button from '@/components/Button/Button'
import loadPostcode from '@services/postcode'
import { useSetRecoilState } from 'recoil'
import { userState } from '@/stores/useState'
import { stepProps } from '@/types/step'
import styles from './Userform.module.scss'

const Userform = ({ prevStep, nextStep }: stepProps) => {
  const setUserState = useSetRecoilState(userState)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [addressDetails, setAddressDetails] = useState({
    postcode: '',
    roadAddress: '',
    detailAddress: '',
  })

  useEffect(() => {
    if (selectedDate) {
      setUserState((prev) => ({
        ...prev,
        birth: selectedDate.toLocaleDateString('ko-KR').replaceAll('. ', '-').substring(0, 8),
      }))
    }
  }, [selectedDate])

  const handleUserState = (key: string, e: any) => {
    setUserState((prev) => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

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
            <input
              type="text"
              className={styles['input-box']}
              onChange={(e) => {
                handleUserState('username', e)
              }}
              placeholder="이름을 입력하세요."
            />
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
            <input
              type="text"
              className={styles['input-box']}
              onChange={(e) => {
                handleUserState('contact', e)
              }}
              placeholder="000-000-000"
            />
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
              value={addressDetails.postcode}
              onChange={(e) => {
                setAddressDetails((prev) => ({
                  ...prev,
                  postcode: e.target.value,
                }))
              }}
              className={styles['input-box']}
              placeholder="우편번호"
              readOnly
            />
            <Button variation="postcode" onClick={() => loadPostcode(setAddressDetails)}>
              주소검색
            </Button>
          </div>
          <div>
            <input
              type="text"
              value={addressDetails.roadAddress}
              className={styles['road-address']}
              onChange={(e) => {
                setAddressDetails((prev) => ({
                  ...prev,
                  roadAddress: e.target.value,
                }))
              }}
              placeholder="도로명 주소"
              readOnly
            />
          </div>
          <div className={styles.flex}>
            <input
              type="text"
              className={styles['detail-address']}
              value={addressDetails.detailAddress}
              onChange={(e) => {
                setAddressDetails((prev) => ({
                  ...prev,
                  detailAddress: e.target.value,
                }))
              }}
              placeholder="상세 주소"
              readOnly
            />
            <input
              type="text"
              onChange={(e) => {
                const fullAddress =
                  `${addressDetails.postcode} ${addressDetails.roadAddress} ${addressDetails.detailAddress}`.trim() +
                  e.target.value
                setUserState((prev) => ({
                  ...prev,
                  address: fullAddress,
                }))
              }}
              className={styles['dong-address']}
              placeholder="(직접 입력)"
            />
          </div>
          <br />
        </div>
        <div className={styles.btn}>
          <div>
            <Button variation="white default" onClick={prevStep}>
              이전
            </Button>
          </div>
          <div>
            <Button variation="purple default" onClick={nextStep}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Userform
