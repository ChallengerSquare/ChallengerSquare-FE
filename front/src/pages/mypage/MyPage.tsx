import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { ContestData } from '@/types/competition'
import { tapState } from '@/pages/mypage/store'
import Navbar from '@/components/Navbar/Navbar'
import MyPageTab from '@/pages/mypage/MyPageTab'
import MyInfo from '@/pages/mypage/myinfo/MyInfo'
import Alarm from '@/pages/mypage/alarm/Alarm'
import styles from '@/pages/mypage/MyPage.module.scss'
import TeamList from './teamlist/TeamList'
import CompetitinoList from './competitionlist/CompetitionList'
import ResultList from './resultlist/ResultList'
import Setting from './mysetting/MySetting'

const MyPage = () => {
  const [tab] = useRecoilState(tapState)

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'마이페이지'}</div>
        <div className={styles.body}>
          <div className={styles.tap}>
            <MyPageTab tab={'myInfo'} />
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
