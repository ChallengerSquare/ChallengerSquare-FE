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
