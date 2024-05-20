export interface ContestData {
  contestId: number
  contestTitle: string
  contestImage: string
  contestDate?: string
}

export interface ContestInfo {
  teamId: number
  awardsId?: number
}

export interface NoticeResponse {
  title: string
  content: string
  date: string
}

export interface NoticeRequset {
  id: number
  page: number
  size: number
}

export interface QnAResponse {
  qnaId: number
  title: string
  content: string
  writer: string
  answer: string
  createdAt: string
  editText: string
}

export interface QnARequset {
  id: number
  page: number
  size: number
}


export interface Contest {
  contestId: number
  contestTitle: string
  contestContent: string
  contestImage: string
  teamName: string
  teamId: number
  registrationPeriod: {
    start: string
    end: string
  }
  contestPeriod: {
    start: string
    end: string
  }
  contestRegistrationNum: number
  contestFee: number
  contestPhone: string
  isPriority: boolean
  contestCategory: string
  contestLocation: string
  participantState: string
  contestState: string
  contestAwards: Award[]
  isOwnerTeamMember: boolean
  isParticipantsLeader: boolean
}

export interface Award {
  awardsId: number
  awardsName: string
  awardsCount: number
  awardsPrize: number
}