/* eslint-disable react/jsx-curly-brace-presence */
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/useState'
import { User } from '@/types/user'
import { registerUser } from '@services/member'
import { ApiResponse } from '@/types/api'
import Button from '@/components/Button/Button'
import check from '@svgs/signup/check.svg'
import styles from './Complete.module.scss'

const Complete = () => {
  const user: User = useRecoilValue(userState)

  useEffect(() => {
    registerUser(user).then((response) => {
      if (response) {
        console.log('회원가입 성공', response)
      } else {
        console.error('회원가입 실패')
      }
    })
  }, [user])

  return (
    <>
      <div className={styles['main-box']}>
        <img src={check} alt="Checkmark" className={styles.size} />
        <div className={styles.font}>가입이 완료되었습니다!</div>
        <div className={styles.font}>서비스를 이용하러 가볼까요?</div>
        <Link to="/">
          <Button variation="purple default">홈으로</Button>
        </Link>
      </div>
    </>
  )
}

export default Complete
