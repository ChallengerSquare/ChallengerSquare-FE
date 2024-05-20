import axios from 'axios'
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

export const getTeamInfoByMember = async (teamId: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/${teamId}`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀원이 팀 정보 조회 API 에러', error)
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

export const createTeam = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('', formData)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 생성 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const deleteMember = async (id: number): Promise<ApiResponse> => {
  const params = {
    participantsId: id,
  }
  try {
    const response = await api.delete<ApiResponse>(`/participants`, { data: params })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 퇴출 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const deleteTeam = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete<ApiResponse>(`/${id}`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 삭제 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const WithdrawTeam = async (id: number): Promise<ApiResponse> => {
  try {
    const params = {
      teamId: id,
    }
    const response = await api.delete<ApiResponse>(`/participants/self`, { params })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 탈퇴 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const putTeam = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>('', formData)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 수정 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getTeamInfo = async (teamId: number): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/${teamId}/public`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('공개된 팀 정보 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getParticipantsTeam = async (code: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/participants`, {
      params: {
        teamCode: code,
      },
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 초대 코드로 팀 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const createParticipantsTeam = async (teamCode: string): Promise<ApiResponse> => {
  try {
    const response = await api.post(`/participants`, {
      code: teamCode,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 가입 신청 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
