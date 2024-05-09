import axios from 'axios'
import { User } from '@/types/user'
import { ApiResponse } from '@/types/api'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/member`,
  withCredentials: true, // 쿠키를 요청에 포함시키도록 설정
})

export const registerUser = async (user: User): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/create', user)
    return response.data
  } catch (error) {
    console.error('회원가입 API 에러', error)
    throw error
  }
}
