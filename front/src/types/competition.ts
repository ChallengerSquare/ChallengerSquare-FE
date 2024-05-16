export interface ContestData {
  contestId: number
  contestTitle: string
  contestImage: string
  contestDate?: string
}

export interface ContestInfo {
  teamId: number
  awardsId: number
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
