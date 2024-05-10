import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { getUser } from '@/services/member'
import Navbar from '@components/Navbar/Navbar'
import { ApiResponse } from '@/types/api'

const Home = () => {
  const { data, isLoading, isError, error } = useQuery<ApiResponse, AxiosError>('user', getUser)
  const userData = data
  console.log(userData?.data)
  if (isLoading) return <div>loading...</div>
  if (isError) return <div>error:{error.message}</div>
  return (
    <>
      <div className="bg-blue-500 min-h-screen">
        <Navbar enableScrollEffect />
        <div>안녕</div>
        <div>메인페이지</div>
      </div>
      <div>gg</div>
      <div>gg</div>
      <div>gg</div>
      <div>gg</div>4<div>gg</div>
      <div>gg</div>
      <div>gg</div>
      <div>gg</div>
    </>
  )
}

export default Home
