import { useEffect, useState } from 'react'
import { TeamListResponse } from '@/types/team'
import { getTeamList } from '@services/member'
import TeamCardList from '@/pages/mypage/teams/list/TeamListCard'
import styles from '@/pages/mypage/teams/Teams.module.scss'

const TeamList = () => {
  const [teamList, setTeamList] = useState<TeamListResponse[]>([])
  const [id, setId] = useState<number>(-1)

  useEffect(() => {
    getTeamList().then(({ data }) => {
      setTeamList(data.content)
    })
  }, [])

  return (
    <div className={styles.teamlist_wrap}>
      <TeamCardList teamListData={teamList} setId={setId} />
    </div>
  )
}

export default TeamList
