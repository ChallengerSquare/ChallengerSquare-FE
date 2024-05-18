import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeamListResponse } from '@/types/team'
import TeamCard from '@/components/TeamCard/TeamCard'
import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import EmptyImg from '@/components/EmptyImg/EmptyImg'

interface TeamCardListProps {
  teamListData: TeamListResponse[]
  setId: Dispatch<SetStateAction<number>>
}

const TeamCardList = ({ teamListData, setId }: TeamCardListProps) => {
  return (
    <div className={styles.teamlist}>
      <div className={styles.head}>
        <div>{'Team > 팀목록'}</div>
        <Link to={'/create-team'} className={styles.btn}>
          {'+ 팀 생성하기'}
        </Link>
      </div>
      <div className={styles.body}>
        {teamListData ? <TeamCard teamlist={teamListData} setId={setId} /> : <EmptyImg text={'팀 목록이 없습니다.'} />}
      </div>
    </div>
  )
}

export default TeamCardList
