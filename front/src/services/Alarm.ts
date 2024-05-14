import axios, { AxiosResponse } from 'axios'
import { ApiResponse } from '@/types/api'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/alert`,
  withCredentials: true,
})

export const getAlarmList = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get(``)
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('알람 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const readAlarm = async (id: number): Promise<ApiResponse> => {
  try {
    const response = await api.put(``, { alertId: id })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('알람 조회 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
