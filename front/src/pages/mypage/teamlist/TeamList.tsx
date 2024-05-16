import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { TeamListData, TeamData } from '@/types/team'
import { teamTapState, teamIdxState, teamDetailTapState } from '@/pages/mypage/store'
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
  teamCode: string
}

const TeamList = () => {
  const [teamIdx, setTeamIdx] = useRecoilState(teamIdxState)
  const [teamTap, setTeamTap] = useRecoilState(teamTapState)
  const [teamDeatilTap, setTeamDetailTap] = useRecoilState(teamDetailTapState)
  const [team, setTeam] = useState<TeamListData>({
    teamId: 1,
    teamImg: '',
    teamName: '',
    teamMember: 1,
    createContest: 1,
    participateContest: 1,
    description: '',
    teamCode: '',
  })
  const [teamList, setTeamList] = useState<TeamListData[]>([
    {
      teamId: 1,
      teamImg: '',
      teamName: '',
      teamMember: 1,
      createContest: 1,
      participateContest: 1,
      description: '',
      teamCode: '',
    },
  ])

  const handleTeamNumber = (idx: number) => {
    setTeamIdx(idx)
    setTeamTap(true)
    setTeamDetailTap(false)
    setTeam(teamList[idx])
  }

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
        teamCode: element.teamCode,
      }))
      setTeamList(TeamList)
    })
  }, [])

  return (
    <div className={styles.teamlist_wrap}>
      {teamTap === false ? (
        <TeamCardList teamListData={teamList} onClick={handleTeamNumber} />
      ) : (
        <TeamDetail teamData={team} />
      )}
    </div>
  )
}

export default TeamList
