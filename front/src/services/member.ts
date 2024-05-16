import axios, { AxiosResponse } from 'axios'
import { User, UserInfo } from '@/types/user'
import { ApiResponse, MemberDto } from '@/types/api'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/member`,
  withCredentials: true,
})

api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
    return response
  },
  async (error: any): Promise<any> => {
    if (error.response.data.status === 401 && error.response.data.code === 'G-013') {
      const originalRequest = error.config
      if (!originalRequest.retry) {
        // 요청 무한 루프 방지
        originalRequest.retry = true
        try {
          await reissueCookie()
          return api(originalRequest)
        } catch (tokenErr) {
          return Promise.reject(tokenErr)
        }
      }
    }
    return Promise.reject(error)
  },
)

export const registerUser = async (user: User): Promise<ApiResponse> => {
  try {
    const memberDto: MemberDto = {
      memberName: user.userName,
      memberBirth: user.userBirth,
      memberPhone: user.userContact,
      memberAddress: user.userAddress,
    }
    const response = await api.put<ApiResponse>('/create', memberDto)
    return response.data
  } catch (error) {
    console.error('회원가입 API 에러', error)
    throw error
  }
}

export const getUser = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('회원조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const reissueCookie = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/refresh')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('토큰 재발급 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getTeamsinLeader = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/teams/leader')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 리스트(팀장) API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getTeamList = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/teams')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('팀 목록 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getCompetitinoList = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/contest')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 목록 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getResultList = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/awards')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 내역 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const deleteUser = async (): Promise<ApiResponse> => {
  try {
    const response = await api.delete('')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('회원 탈퇴 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const updateUser = async (userInfo: UserInfo): Promise<ApiResponse> => {
  try {
    const response = await api.put('/update', {
      memberName: userInfo.memberName,
      memberPhone: userInfo.memberPhone,
      memberAddress: userInfo.memberAddress,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('회원 정보 수정 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const logoutUser = async (): Promise<ApiResponse> => {
  try {
    const response = await api.delete('/logout')
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('로그아웃 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
