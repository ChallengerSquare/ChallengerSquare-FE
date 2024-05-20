/* eslint-disable react/jsx-curly-brace-presence */
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { User } from '@/types/user'
import { registerUser } from '@services/member'
import { userState } from '@/stores/userState'
import Button from '@/components/Button/Button'
import check from '@svgs/signup/check.svg'
import styles from './Complete.module.scss'

const Complete = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles['main-box']}>
        <img src={check} alt="Checkmark" className={styles.size} />
        <div className={styles.font}>가입이 완료되었습니다!</div>
        <div className={styles.font}>서비스를 이용하러 가볼까요?</div>
        <Button
          variation="purple default"
          onClick={() => {
            navigate('/')
          }}
        >
          홈으로
        </Button>
      </div>
    </>
  )
}

export default Complete
