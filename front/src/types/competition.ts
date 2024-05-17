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
