import { useRecoilState } from 'recoil'
import { tapState } from '@/pages/mypage/store'
import styles from './MyPage.module.scss'

const MyPageTap = () => {
  const [tab, setTab] = useRecoilState(tapState)

  const onClickTap = (state: string) => {
    setTab(state)
  }

  return (
    <div className={styles.taplist}>
      <div className={styles.home}>
        <div className={styles.title}>{'Home'}</div>
        <div className={styles.content}>
          <button
            type={'button'}
            onClick={() => onClickTap('myInfo')}
            className={tab === 'myInfo' ? styles.active : styles.inactive}
          >
            {'내 정보'}
          </button>
          <button
            type={'button'}
            onClick={() => onClickTap('alarm')}
            className={tab === 'alarm' ? styles.active : styles.inactive}
          >
            {'알림'}
          </button>
        </div>
      </div>
      <div className={styles.team}>
        <div className={styles.title}>{'Team'}</div>
        <div className={styles.content}>
          <button
            type={'button'}
            onClick={() => onClickTap('teamList')}
            className={tab === 'teamList' ? styles.active : styles.inactive}
          >
            {'팀 목록'}
          </button>
        </div>
      </div>
      <div className={styles.competition}>
        <div className={styles.title}>{'Competition'}</div>
        <div className={styles.content}>
          <button
            type={'button'}
            onClick={() => onClickTap('competitinoList')}
            className={tab === 'competitinoList' ? styles.active : styles.inactive}
          >
            {'신청한 대회'}
          </button>
          <button
            type={'button'}
            onClick={() => onClickTap('resultList')}
            className={tab === 'resultList' ? styles.active : styles.inactive}
          >
            {'참가한 대회'}
          </button>
        </div>
      </div>
      <div className={styles.setting}>
        <div className={styles.title}>{'Setting'}</div>
        <div className={styles.content}>
          <button
            type={'button'}
            onClick={() => onClickTap('setting')}
            className={tab === 'setting' ? styles.active : styles.inactive}
          >
            {'설정'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyPageTap
