import axios from 'axios'
import { ApiResponse, RegisterNoticeRequest } from '@/types/api'
import { NoticeRequset } from '@/types/competition'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/notice`,
  withCredentials: true,
})

export const getCompetitionNotice = async (param: NoticeRequset): Promise<ApiResponse> => {
  try {
    const params = {
      page: param.page,
      size: param.size,
    }
    const response = await api.get(`/${param.id}`, { params })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 Notice 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const registerNotice = async (data: RegisterNoticeRequest): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('', data)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 참가 신청 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
