export interface ApiResponse {
  code?: string
  status?: number
  data?: any
  message?: string
}

export interface MemberDto {
  memberName: string
  memberBirth: string
  memberPhone: string
  memberAddress: string
}

export interface CompetitionAwards {
  awardsName: string
  awardsCount: number
  awardsPrize: number
}

export interface CompetitionPeriod {
  start: string
  end: string
}

export interface RegistrationPeriod {
  start: string
  end: string
}

export interface CompetitionCreateRequestDto {
  contestTitle: string
  contestContent: string
  contestLocation: string
  teamId: number
  registrationPeriod: RegistrationPeriod
  contestPeriod: CompetitionPeriod
  contestRegistrationNum: number
  contestFee: number
  contestPhone: string
  isPriority: boolean
  contestCategory: string
  contestPeopleMin: number
  contestPeopleMax: number
  contestAwards: CompetitionAwards[]
}

export interface CreateCompetitionDto {
  contestImage: string
  contestCreateRequestDto: CompetitionCreateRequestDto
}

export interface SearchResponse {
  contestId: number
  contestTitle: string
  contestImage: string
  teamName: string
  registrationPeriod: CompetitionPeriod
  contestPeriod: RegistrationPeriod
}

export interface SearchRequest {
  keyword?: string | null
  category?: number | null
  isEnd?: boolean
  page?: number
  size?: number
  orderBy?: number
}

export interface Page {
  currentPage: number
  totalPage: number
}