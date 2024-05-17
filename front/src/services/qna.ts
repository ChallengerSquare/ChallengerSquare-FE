import axios from 'axios'
import { ApiResponse } from '@/types/api'
import { QnARequset } from '@/types/competition'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/qna`,
  withCredentials: true,
})

export const getCompetitionQnA = async (param: QnARequset): Promise<ApiResponse> => {
  try {
    const params = {
      page: param.page,
      size: param.size,
    }
    const response = await api.get<ApiResponse>(`/${param.id}`, { params })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 QnA API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}

export const updateCompetitionQnA = async (id: number, answerParam: string): Promise<ApiResponse> => {
  try {
    const response = await api.put<ApiResponse>(``, {
      qnaId: id,
      answer: answerParam,
    })
    return {
      status: response.status,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    console.error('대회 QnA 댓글 작성 API 에러', error)
    return {
      status: error.response.status,
      code: error.response.data.code,
      message: error.response.data.message,
    }
  }
}
