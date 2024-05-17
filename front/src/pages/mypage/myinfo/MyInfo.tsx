import { useState, useEffect, useInsertionEffect } from 'react'
import { User, UserInfo } from '@/types/user'
import styles from '@/pages/mypage/myinfo/MyInfo.module.scss'
import Button from '@/components/Button/Button'
import loadPostcode from '@/services/postcode'
import { getUser, logoutUser, updateUser } from '@services/member'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { userState } from '@/stores/userState'

const MyInfo = () => {
  const navigate = useNavigate()
  const resetUserState = useResetRecoilState(userState)
  const [user, setUser] = useState<User>({
    userName: '',
    userBirth: '',
    userContact: '',
    userAddress: '',
    userEmail: '',
  })
  const [editUser, setEditUser] = useState<User>({
    userName: '',
    userBirth: '',
    userContact: '',
    userAddress: '',
    userEmail: '',
  })
  const [addressDetails, setAddressDetails] = useState({
    postcode: '',
    roadAddress: '',
    detailAddress: '',
  })
  const [address, setAddress] = useState('')

  useEffect(() => {
    getUser().then(({ data }) => {
      setUser({
        userName: data.memberName,
        userBirth: data.memberBirth,
        userContact: data.memberPhone,
        userAddress: data.memberAddress,
        userEmail: data.memberEmail,
      })
    })
  }, [])

  useEffect(() => {
    settingData()
  }, [user])

  const settingData = () => {
    setEditUser(user)
    if (user.userAddress != '') {
      setAddressDetails({
        postcode: user.userAddress.split(' ')[0],
        roadAddress: `${user.userAddress.split(' ').slice(1).join(' ').split(')')[0]})`,
        detailAddress: '',
      })
      setAddress(`${user.userAddress.split(')')[1].split(' ').slice(1).join(' ')}`)
    }
  }

  const handleUser = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'userAddress') {
      const fullAddress = `${addressDetails.postcode} ${addressDetails.roadAddress} ${event.target.value}`
      setAddress(event.target.value)
      setEditUser((prev) => ({ ...prev, [key]: fullAddress }))
    } else setEditUser((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handelePostRequest = () => {
    const userInfo: UserInfo = {
      memberName: editUser.userName,
      memberPhone: editUser.userContact,
      memberAddress: editUser.userAddress,
    }
    updateUser(userInfo)
    setUser(editUser)
    if (editUser != user) {
      alert('내 정보가 수정되었습니다.')
    }
  }

  const handleLogout = () => {
    logoutUser()
    resetUserState()
    window.location.href = '/competition'
  }

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'HOME > 내정보'}</div>
        <button type={'button'} className={styles.btn} onClick={handleLogout}>
          {'로그아웃'}
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <label htmlFor={'username'}>{'이름'}</label>
          </div>
          <div className={styles.input}>
            <input
              id={'username'}
              type={'text'}
              value={editUser.userName || ''}
              onChange={(event) => handleUser('userName', event)}
            />
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <label htmlFor={'email'}>{'이메일'}</label>
          </div>
          <div className={styles.input}>
            <div className={styles.input}>
              <input
                id={'email'}
                type={'text'}
                value={editUser.userEmail || ''}
                onBlur={(event) => handleUser('userEmail', event)}
                disabled
              />
            </div>
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <label htmlFor={'birth'}>{'생년월일'}</label>
          </div>
          <div className={styles.input}>
            <div className={styles.input}>
              <input
                id={'birth'}
                type={'text'}
                value={editUser.userBirth || ''}
                onChange={(event) => handleUser('userBirth', event)}
                disabled
              />
            </div>
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <label htmlFor={'contact'}>{'전화번호'}</label>
          </div>
          <div className={styles.input}>
            <input
              id={'contact'}
              type={'text'}
              value={editUser.userContact || ''}
              onChange={(event) => handleUser('userContact', event)}
            />
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <label htmlFor={'address'}>{'주소'}</label>
          </div>
          <div className={styles.input}>
            <input type={'text'} value={addressDetails.postcode} readOnly />
            <button type={'button'} onClick={() => loadPostcode(setAddressDetails)}>
              {'주소검색'}
            </button>
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <div>{''}</div>
          </div>
          <div className={styles.input}>
            <input className={styles.address} type={'text'} value={addressDetails.roadAddress} readOnly />
          </div>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_title}>
            <div>{''}</div>
          </div>
          <div className={styles.input}>
            <input
              className={styles.address}
              id={'address'}
              type={'text'}
              value={address}
              onChange={(event) => handleUser('userAddress', event)}
            />
          </div>
        </div>
        <div className={styles.button_wrap}>
          <Button variation={'purple default'} onClick={handelePostRequest}>
            {'수정'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyInfo
