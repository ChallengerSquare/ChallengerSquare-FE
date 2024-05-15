import { ApiResponse, SearchRequest } from '@/types/api'
import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/contest`,
  withCredentials: false,
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
