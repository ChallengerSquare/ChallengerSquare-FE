import styles from '@/pages/createteam/CreateTeam.module.scss'
import Navbar from '@/components/Navbar/Navbar'
import { useState } from 'react'
import Button from '@/components/Button/Button'
import { useNavigate } from 'react-router-dom'
import { tapState } from '@/pages/mypage/store'
import { useRecoilState } from 'recoil'
import ProfileImg from '@/components/ProfileImg/ProfileImg'

interface TeamData {
  name: string
  description: string
  img: string
}

const CreateTeam = () => {
  const navigate = useNavigate()
  const [tap, setTap] = useRecoilState(tapState)
  const [teamData, setTeamDate] = useState<TeamData>({
    name: '',
    description: '',
    img: '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && ev.target.result) {
          setTeamDate((prev) => ({
            ...prev,
            img: ev.target?.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTeamDateChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (key === 'name') setTeamDate((prev) => ({ ...prev, name: event.target.value }))
    else setTeamDate((prev) => ({ ...prev, description: event.target.value }))
  }

  const headlePostTeamData = () => {
    if (!teamData.name || !teamData.description || !teamData.img) {
      alert('모든 필수 정보를 입력해주세요.')
    } else {
      console.log(teamData) /* 팀 생성 API 호출 */
      // 마이페이지 팀 목록 페이지 이동
      setTap('teamList')
      navigate('/mypage')
    }
  }

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.head}>{'팀 생성하기'}</div>
        <div className={styles.body}>
          <div className={styles.profile}>
            <ProfileImg
              imgUrl={teamData.img}
              imgName={'팀이미지'}
              name={'teamdetail'}
              edit
              onChange={handleImageChange}
            />
            <p>{'팀 프로필 이미지'}</p>
          </div>
          <div className={styles.content}>
            <div className={styles.input_line}>
              <label htmlFor={'teamName'} className={styles.input_title}>
                <span>{'*'}</span>
                {'팀이름'}
              </label>
              <input
                id={'teamName'}
                className={styles.input_name}
                onBlur={(event) => handleTeamDateChange('name', event)}
              />
            </div>
            <div className={styles.input_line}>
              <label htmlFor={'teamDescription'} className={styles.input_title}>
                <span>{'*'}</span>
                {'팀설명'}
              </label>
              <textarea
                id={'teamDescription'}
                className={styles.input_description}
                onBlur={(event) => handleTeamDateChange('description', event)}
                name="opinion"
              />
            </div>
          </div>
        </div>
        <div className={styles.tail}>
          <Button variation={'purple'} onClick={headlePostTeamData}>
            {'수정하기'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTeam
