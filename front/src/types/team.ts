export interface TeamListData {
  teamId: number
  teamImg: string
  teamName: string
  teamMember: number
  createContest: number
  participateContest: number
  description: string
  teamCode?: string
}

export interface TeamData {
  id: number
  name: string
  description: string
  img: string
}

export interface TeamListResponse {
  teamId: number
  teamImage: string
  teamName: string
  teamMemberCount: number
  teamContestCount: number
  teamParticipantsCount: number
  teamDescription: string
  teamCode: string
}
export interface TeamResponse {
  teamId: number
  teamName: string
  teamDescription: string
  teamCode?: string
  teamImage: string
  isLeader?: boolean
}
