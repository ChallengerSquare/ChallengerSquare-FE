import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useNavbarScroll from '@/hooks/useNavbarScroll'
import { getUser } from '@services/member'
import { useRecoilState } from 'recoil'
import { userState } from '@/stores/userState'
import { User } from '@/types/user'
import Button from '@components/Button/Button'
import { ApiResponse, MemberDto } from '@/types/api'
import styles from './Navbar.module.scss'

interface NavbarProps {
  enableScrollEffect?: boolean
}

const Navbar = ({ enableScrollEffect = false }: NavbarProps) => {
  const [user, setUser] = useRecoilState<User>(userState)
  const challS = `${process.env.PUBLIC_URL}/svgs/logo/challS.svg`
  const navbarScroll = useNavbarScroll(enableScrollEffect)
  useEffect(() => {
    const checkUser = async () => {
      if (!user.userName) {
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
      }
    }

    checkUser()
  }, [user.userName, setUser])

  return (
    <header className={styles.header} style={{ backgroundColor: navbarScroll }}>
      <div className="header container mx-auto flex justify-between items-center">
        <div className="flex items-center text-xl">
          <Link to="/">
            <img src={challS} alt="renewal" className={styles.logo} />
          </Link>
        </div>
        <nav>
          <NavLink
            to="/competition"
            className={styles.link}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isActive ? '#8930FD' : '',
              }
            }}
          >
            대회
          </NavLink>
          <NavLink
            to="/competition-results"
            className={styles.link}
            style={({ isActive }) => {
              return {
                fontWeight: isActive ? 'bold' : '',
                color: isActive ? '#8930FD' : '',
              }
            }}
          >
            수상/참가 조회
          </NavLink>
        </nav>
        {user.userName ? (
          <Link to="/mypage">
            <Button variation="white">마이페이지</Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button variation="purple">로그인</Button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
