import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Navigate, Outlet } from 'react-router-dom'
import { userState } from '@/stores/userState'
import { User } from '@/types/user'
import { ApiResponse, MemberDto } from '@/types/api'
import { getUser } from '@/services/member'

const PrivateRoute = () => {
  const [user, setUser] = useRecoilState<User>(userState)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      if (!user.userName) {
        // userState 가 비어 있으면
        try {
          const response: ApiResponse = await getUser()
          if (response.status === 200) {
            const member: MemberDto = response.data
            setUser({
              userName: member.memberName,
              userBirth: member.memberBirth,
              userContact: member.memberPhone,
              userAddress: member.memberAddress,
            })
          } else {
            console.log(`${response.status} : ${response.code} :  ${response.message}`)
          }
        } catch (error) {
          console.error('Failed to fetch user', error)
        }
      }
      setLoading(false)
    }
    checkUser()
  }, [user, setUser])

  if (loading) {
    return <div />
  }

  if (!user.userName) {
    return <Navigate to="/auth" />
  }
  return <Outlet />
}

export default PrivateRoute
