import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useNavbarScroll from '@/hooks/useNavbarScroll'
import { getUser } from '@services/member'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '@/stores/userState'
import { User } from '@/types/user'
import Button from '@components/Button/Button'
import { ApiResponse, MemberDto } from '@/types/api'
import { notificationState } from '@/stores/notificationState'
import challS from '@svgs/logo/challS.svg'
import bellOn from '@svgs/bellon.svg'
import bellOff from '@svgs/bell.svg'
import styles from './Navbar.module.scss'

interface NavbarProps {
  enableScrollEffect?: boolean
}

const Navbar = ({ enableScrollEffect = false }: NavbarProps) => {
  const [user, setUser] = useRecoilState<User>(userState)
  const alarm = useRecoilValue(notificationState)
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
          <>
            <div className={styles.user}>
              <div className={styles.bell}>
                <button type="button">
                  <img src={alarm ? bellOn : bellOff} alt="bellIcon" className={styles.size} />
                </button>
              </div>
              <div className={styles.button}>
                <Link to="/mypage/myinfo">
                  <Button variation="user">마이페이지</Button>
                </Link>
              </div>
            </div>
          </>
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
