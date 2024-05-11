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
