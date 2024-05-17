import Navbar from '@/components/Navbar/Navbar'
import { useState } from 'react'
import { useMutation } from 'react-query'
import Button from '@/components/Button/Button'
import { tapState } from '@/pages/mypage/store'
import { useRecoilState } from 'recoil'
import ProfileImg from '@/components/ProfileImg/ProfileImg'
import { TeamRequestDto } from '@/types/api'
import { createTeam } from '@/services/team'
import styles from '@/pages/createteam/CreateTeam.module.scss'
import CreateTeamModal from './CreateTeamModal/CreateTeamModal'

interface TeamData {
  name: string
  description: string
  img: string
}

const CreateTeam = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [teamData, setTeamData] = useState<TeamData>({
    name: '',
    description: '',
    img: '',
  })

  const data = useMutation(createTeam, {
    onSuccess: () => {
      setIsOpen(true)
    },
    onError: (error) => {
      console.error('팀 생성 실패:', error)
      alert('팀 생성에 실패하였습니다.')
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && ev.target.result) {
          setTeamData((prev) => ({
            ...prev,
            img: ev.target?.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleTeamDateChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (key === 'name') setTeamData((prev) => ({ ...prev, name: event.target.value }))
    else setTeamData((prev) => ({ ...prev, description: event.target.value }))
  }

  const base64ToBlob = (base64: string, mime: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mime })
  }

  const handleFormData = () => {
    const formData = new FormData()
    const teamRequestDto: TeamRequestDto = {
      teamName: teamData.name,
      teamDescription: teamData.description,
    }
    if (teamData.img && teamData.img.startsWith('data:image')) {
      const base64Response = teamData.img.split(',')[1]
      const blob = base64ToBlob(base64Response, 'image/jpeg') // MIME type을 정확히 알 경우 사용
      formData.append('teamImage', blob, 'team-image.jpg')
    }
    formData.append(
      'teamRequestDto',
      new Blob([JSON.stringify(teamRequestDto)], {
        type: 'application/json',
      }),
    )

    data.mutate(formData)
  }

  const headlePostTeamData = () => {
    if (!teamData.name || !teamData.description) {
      alert('모든 필수 정보를 입력해주세요.')
    } else {
      console.log(teamData) /* 팀 생성 API 호출 */
      handleFormData()
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
          <Button variation={'purple'} onClick={headlePostTeamData} width={120}>
            {'생성하기'}
          </Button>
          <CreateTeamModal isOpen={isOpen} handleClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default CreateTeam
