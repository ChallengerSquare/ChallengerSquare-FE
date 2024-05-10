import styles from '@/pages/mypage/MyPage.module.scss'

const MyInfo = () => {
  return (
    <div>
      <div className={styles.title}>
        <div>{'HOME > 내정보'}</div>
        <button type={'button'} className={styles.sub}>
          {'회원탈퇴'}
        </button>
      </div>
    </div>
  )
}

export default MyInfo
