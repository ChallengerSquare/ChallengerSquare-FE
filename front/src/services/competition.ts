import { ApiResponse, SearchRequest } from '@/types/api'
import { ContestInfo } from '@/types/competition'
import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/contest`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getCompetitionList = async (params: SearchRequest): Promise<ApiResponse> => {
  try {
    const response = await api.get('', { params })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error) {
    console.error('대회 목록 호출 에러', error)
    throw error
  }
}

export const getTeamList = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/participants/${id}`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회에 참가한 팀 목록 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const updateCompetitionState = async (id: number, state: string): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/state`, {
      contestId: id,
      contestState: state,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 상태 변경 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const updateCompetitionParticipants = async (id: number, members: number[]): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/participants`, {
      contestId: id,
      agreeMembers: members,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 참가 신청 승인/거절 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const updateCompetitionEnd = async (id: number, info: ContestInfo[]): Promise<ApiResponse> => {
  try {
    const response = await api.post(`/awards`, {
      contestId: id,
      contestInfo: info,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('시상정보 작성 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
