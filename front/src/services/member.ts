import axios from 'axios'
import { User } from '@/types/user'
import { ApiResponse, MemberDto } from '@/types/api'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/member`,
  withCredentials: true, // 쿠키를 요청에 포함시키도록 설정
})

export const registerUser = async (user: User): Promise<ApiResponse> => {
  try {
    const memberDto: MemberDto = {
      memberName: user.username,
      memberBirth: user.birth,
      memberPhone: user.contact,
      memberAddress: user.address,
    }
    const response = await api.put<ApiResponse>('/create', memberDto)
    return response.data
  } catch (error) {
    console.error('회원가입 API 에러', error)
    throw error
  }
}
