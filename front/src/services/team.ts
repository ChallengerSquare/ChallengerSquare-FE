import axios, { AxiosResponse } from 'axios'
import { ApiResponse } from '@/types/api'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/team`,
  withCredentials: true,
})

export const getContestList = async (teamId: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/${teamId}/contest`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀이 개최한 목록 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getLeaderUserList = async (teamId: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/${teamId}/participants`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀장이 팀원 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getUserList = async (teamId: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/${teamId}/members`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀원이 팀원 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const updateMemberParticipants = async (id: number, isAgree: boolean): Promise<ApiResponse> => {
  try {
    const response = await api.put(`/participants`, {
      participantsId: id,
      participantAgree: isAgree,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀장이 팀원 승인 or 거절 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
