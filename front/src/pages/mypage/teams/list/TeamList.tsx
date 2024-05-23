import { useEffect, useState } from 'react'
import { TeamListResponse } from '@/types/team'
import { getTeamList } from '@services/member'
import TeamCardList from '@/pages/mypage/teams/list/TeamListCard'
import styles from '@/pages/mypage/teams/Teams.module.scss'

const TeamList = () => {
  const [teamList, setTeamList] = useState<TeamListResponse[]>([])

  useEffect(() => {
    getTeamList().then(({ data }) => {
      setTeamList(data.content)
    })
  }, [])

  return (
    <div className={styles.teamlist_wrap}>
      <TeamCardList teamListData={teamList} />
    </div>
  )
}

export default TeamList
