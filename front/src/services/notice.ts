import axios from 'axios'
import { ApiResponse } from '@/types/api'
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
    console.error('대회 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
