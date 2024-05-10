import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { contestData } from '@/types/competition'
import { tapState } from '@/pages/mypage/store'
import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab'
import MyInfo from '@/pages/mypage/MyInfo'
import Alarm from '@/pages/mypage/Alarm'
import styles from '@/pages/mypage/MyPage.module.scss'
import TeamList from './TeamList'
import CompetitinoList from './CompetitinoList'
import ResultList from './ResultList'
import Setting from './Setting'

const MyPage = () => {
  const [contestList, setContestList] = useState<contestData[]>([])
  const [tab, setTab] = useRecoilState(tapState)

  useEffect(() => {
    /*
    API 호출
        contestId: number
        contestTitle: string
        contestImage: string
    */
    const dumyData = () => [
      { contestId: 1, contestTitle: 'Buzzer Beater', contestImage: 'url' },
      { contestId: 2, contestTitle: '대회2', contestImage: 'url' },
      { contestId: 3, contestTitle: '대회3', contestImage: 'url' },
      { contestId: 4, contestTitle: '대회4', contestImage: 'url' },
      { contestId: 5, contestTitle: '대회5', contestImage: 'url' },
    ]
    setContestList(dumyData)
  }, [])

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab />
          </div>
          <div className={styles.content_wrap}>
            {tab === 'myInfo' && <MyInfo />}
            {tab === 'alarm' && <Alarm />}
            {tab === 'teamList' && <TeamList />}
            {tab === 'competitinoList' && <CompetitinoList />}
            {tab === 'resultList' && <ResultList />}
            {tab === 'setting' && <Setting />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage
