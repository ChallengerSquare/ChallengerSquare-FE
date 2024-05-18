import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { TeamListData } from '@/types/team'
import { teamIdxState, teamTapState, teamDetailTapState } from '@/pages/mypage/store'
import TeamCard from '@/components/TeamCard/TeamCard'
import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import { Link } from 'react-router-dom'

interface TeamCardListProps {
  teamListData: TeamListData[]
  onClick: (idx: number) => void
}

const TeamCardList = ({ teamListData, onClick }: TeamCardListProps) => {
  const [teamList, setTeamList] = useState<TeamListData[]>(teamListData)

  useEffect(() => {
    setTeamList(teamListData)
  }, [teamListData])

  return (
    <div className={styles.teamlist}>
      <div className={styles.head}>
        <div>{'Team > 팀목록'}</div>
        <Link to={'/create-team'} className={styles.btn}>
          {'+ 팀 생성하기'}
        </Link>
      </div>
      <div className={styles.body}>
        {teamListData ? <TeamCard team={teamList} onClick={onClick} /> : <EmptyImg text={'팀 목록이 없습니다.'} />}
      </div>
    </div>
  )
}

export default TeamCardList
