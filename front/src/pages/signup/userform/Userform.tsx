/* eslint-disable react/jsx-curly-brace-presence */
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Calendar, { formatDate } from '@components/Calendar/Calendar'
import HelpButton from '@svgs/help_button.svg'
import Button from '@/components/Button/Button'
import loadPostcode from '@services/postcode'
import ping from '@svgs/ping.svg'
import { stepProps } from '@/types/step'
import { userState } from '@stores/userState'
import { User } from '@/types/user'
import { registerUser } from '@/services/member'
import styles from './Userform.module.scss'

const Userform = ({ prevStep, nextStep }: stepProps) => {
  const setUser = useSetRecoilState(userState)
  const [name, setName] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [birth, setBirth] = useState<Date | null>(null)
  const [addressDetails, setAddressDetails] = useState({
    postcode: '',
    roadAddress: '',
    detailAddress: '',
  })
  const [selectAddress, setSelectAddress] = useState<string>('')

  const handleSetMember = () => {
    if (name && contact && birth && addressDetails.postcode) {
      const fullAddress = `${addressDetails.postcode} ${addressDetails.roadAddress} ${addressDetails.detailAddress} ${selectAddress}`

      const birthDate = formatDate(birth)
      const member: User = {
        userName: name,
        userBirth: birthDate,
        userContact: contact,
        userAddress: fullAddress,
      }
      setUser((prev) => ({
        ...prev,
        userName: member.userName,
        userBirth: member.userBirth,
        userContact: member.userContact,
        userAddress: member.userAddress,
      }))
      registerUser(member).then((response) => {
        if (response) {
          console.log('회원가입 성공', response)
          nextStep?.()
        } else {
          console.error('회원가입 실패')
        }
      })
    } else {
      alert('항목을 모두 입력해주세요.')
    }
  }

  return (
    <>
      <div className={styles['main-box']}>
        <div className={styles.header}>
          <div className={styles.bold}>&nbsp; &nbsp; &nbsp; &nbsp; 개인정보 입력</div>
        </div>
        <div className={styles.form}>
          <div className={styles.input}>
            <div className={styles.label}>&nbsp; 이름</div>
            <input
              type="text"
              className={styles['name-box']}
              onChange={(item) => {
                setName(item.target.value)
              }}
              placeholder="이름 입력"
            />
          </div>
          <div className={styles.input}>
            <div className={styles.label}>&nbsp; 생년월일</div>
            <div className={styles.calendar}>
              <Calendar selectedDate={birth} setSelectedDate={setBirth} maxDate={new Date()} />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.label}>&nbsp; 연락처</div>
            <input
              type="text"
              className={styles['input-box']}
              onChange={(item) => {
                setContact(item.target.value)
              }}
              placeholder="000-0000-0000"
            />
            <div className={styles.help}>
              <img src={HelpButton} alt="도움말" />
            </div>
          </div>
          <div className={styles.input}>
            <div className={styles.label}>&nbsp; 주소</div>
            <input
              type="text"
              value={addressDetails.postcode}
              onChange={(item) => {
                setAddressDetails({
                  ...addressDetails,
                  postcode: item.target.value,
                })
              }}
              className={styles.postcode}
              placeholder="우편번호"
              readOnly
            />
            <div className="ml-4">
              <Button variation="regist_competition_btn" onClick={() => loadPostcode(setAddressDetails)}>
                <img src={ping} alt="ping" className={styles.ping} />
              </Button>
            </div>
          </div>
          <div>
            <input
              type="text"
              value={addressDetails.roadAddress}
              className={styles['road-address']}
              onChange={(item) => {
                setAddressDetails({
                  ...addressDetails,
                  roadAddress: item.target.value,
                })
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
              onChange={(item) => {
                setAddressDetails({
                  ...addressDetails,
                  detailAddress: item.target.value,
                })
              }}
              placeholder="상세 주소"
              readOnly
            />
            <input
              type="text"
              onChange={(item) => {
                setSelectAddress(item.target.value)
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
            <Button variation="purple default" onClick={handleSetMember}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Userform
