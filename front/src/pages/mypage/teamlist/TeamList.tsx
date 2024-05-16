import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { TeamListData, TeamData } from '@/types/team'
import { teamTapState, teamIdxState } from '@/pages/mypage/store'
import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { getTeamList } from '@services/member'
import TeamCardList from './TeamCardList'
import TeamDetail from './TeamDetail'

interface TeamListDataBack {
  teamId: number
  teamImage: string
  teamName: string
  teamMemberCount: number
  teamContestCount: number
  teamParticipantsCount: number
  teamDescription: string
}

const TeamList = () => {
  const [teamTap, setTeamTap] = useRecoilState(teamTapState)
  const [teamList, setTeamList] = useState<TeamListData[]>([
    {
      teamId: 1,
      teamImg: '',
      teamName: '',
      teamMember: 1,
      createContest: 1,
      participateContest: 1,
      description: '',
    },
  ])

  useEffect(() => {
    setTeamTap(false)
    getTeamList().then(({ data }) => {
      const TeamList: TeamListData[] = data.content.map((element: TeamListDataBack) => ({
        teamId: element.teamId,
        teamImg: element.teamImage == null ? '' : element.teamImage,
        teamName: element.teamName,
        teamMember: element.teamMemberCount,
        createContest: element.teamContestCount,

        participateContest: element.teamParticipantsCount,
        description: element.teamDescription,
      }))
      setTeamList(TeamList)
    })
  }, [])

  return (
    <div className={styles.teamlist_wrap}>
      {teamTap === false ? <TeamCardList teamListData={teamList} /> : <TeamDetail teamListData={teamList} />}
    </div>
  )
}

export default TeamList
