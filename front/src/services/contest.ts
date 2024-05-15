import axios, { AxiosResponse } from 'axios'
import { ApiResponse, CompetitionCreateRequestDto } from '@/types/api'
import { reissueCookie } from './member'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/contest`,
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

export const registerCompetition = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('', formData)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 생성 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const getCompetitionDetails = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(`/${id}`)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const modifyContestContent = async (competition: CompetitionCreateRequestDto): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>('', competition)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 수정 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
