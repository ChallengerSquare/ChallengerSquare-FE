import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { TeamListData, TeamData } from '@/types/team'
import { teamTapState, teamIdxState } from '@/pages/mypage/store'
import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import TeamCardList from './TeamCardList'
import TeamDetail from './TeamDetail'

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
    /* 팀 목록 API 호출 */
    const teamDataList: TeamListData[] = [
      {
        teamId: 1,
        teamImg: '',
        teamName: 'A201',
        teamMember: 4,
        createContest: 2,
        participateContest: 5,
        description:
          '팀 A는 다양한 분야에서 경험이 풍부한 도전을 즐기고 재밌고 새로운 아이디어를 가지고 있는 창의적이고 소통과 협업이 원활한 팀입니다.',
      },
      {
        teamId: 2,
        teamImg: '',
        teamName: 'A201',
        teamMember: 3,
        createContest: 1,
        participateContest: 3,
        description: '팀 B는 소통과 협업이 원활한 팀입니다.',
      },
      {
        teamId: 3,
        teamImg: '',
        teamName: 'A201',
        teamMember: 5,
        createContest: 3,
        participateContest: 7,
        description: '팀 C는 다양한 분야에서 경험이 풍부한 팀입니다.',
      },
      {
        teamId: 4,
        teamImg: '',
        teamName: 'A201',
        teamMember: 2,
        createContest: 0,
        participateContest: 2,
        description: '팀 D는 기술적인 도전을 즐기는 팀입니다.',
      },
      {
        teamId: 5,
        teamImg: '',
        teamName: 'A201',
        teamMember: 6,
        createContest: 4,
        participateContest: 9,
        description: '팀 E는 성과를 중시하는 팀입니다.',
      },
    ]
    setTeamList(teamDataList)
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
