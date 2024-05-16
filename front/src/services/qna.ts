import axios from 'axios'
import { ApiResponse } from '@/types/api'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/qna`,
  withCredentials: true,
})

export const getCompetitionQnA = async (id: number): Promise<ApiResponse> => {
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
