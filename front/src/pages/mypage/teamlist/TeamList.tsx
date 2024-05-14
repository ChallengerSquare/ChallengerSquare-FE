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
  const [teamIdx] = useRecoilState(teamIdxState)
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
  const [team, setTeam] = useState<TeamData>({
    id: 0,
    name: '',
    description: '',
    img: '',
  })

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

  useEffect(() => {
    handleSetTeam()
  }, [teamList, teamIdx])

  const handleSetTeam = () => {
    if (teamList.length > 0)
      setTeam({
        id: teamList[teamIdx].teamId,
        name: teamList[teamIdx].teamName,
        description: teamList[teamIdx].description,
        img: teamList[teamIdx].teamImg,
      })
  }

  return (
    <div className={styles.teamlist_wrap}>
      {teamTap === false ? <TeamCardList teamListData={teamList} /> : <TeamDetail teamData={team} />}
    </div>
  )
}

export default TeamList
