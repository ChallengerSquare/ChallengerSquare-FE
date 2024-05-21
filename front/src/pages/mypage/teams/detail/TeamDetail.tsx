import { useMutation } from 'react-query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TeamResponse } from '@/types/team'
import { WithdrawTeam, deleteTeam, getTeamInfoByMember, putTeam } from '@/services/team'
import styles from '@/pages/mypage/teams/Teams.module.scss'
import ProfileImg from '@/components/ProfileImg/ProfileImg'
import LinkImg from '@svgs/link.svg'
import Edit from '@svgs/edit.svg'
import TeamDetailContest from '@/pages/mypage/teams/detail/TeamDetailContest'
import TeamMember from '@/pages/mypage/teams/detail/TeamDetailMember'
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal'
import { TeamRequestDto } from '@/types/api'

const Team = () => {
  const navigate = useNavigate()
  const { teamId } = useParams<{ teamId: string }>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [tap, setTap] = useState<boolean>(true)
  const [edit, setEdit] = useState<boolean>(false)
  const [team, setTeam] = useState<TeamResponse>({
    teamId: 0,
    teamName: '',
    teamDescription: '',
    teamCode: '',
    teamImage: '',
    isLeader: false,
  })
  const [teamTemp, setTeamTemp] = useState<TeamResponse>({
    teamId: 0,
    teamName: '',
    teamDescription: '',
    teamImage: '',
  })

  useEffect(() => {
    if (teamId != null) {
      const id = parseInt(teamId, 10)
      getTeamInfoByMember(id).then(({ status, data }) => {
        if (status === 200) {
          setTeam(data)
          setTeamTemp(data)
        } else if (status === 404) {
          navigate(-1)
        }
        setTeam(data)
      })
    }
  }, [teamId])

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('팀 초대 링크가 복사되었습니다.')
    } catch (error) {
      console.log('error')
    }
  }

  const handleClickEdit = (key: string) => {
    if (key === 'edit') {
      if (edit) {
        setEdit(false)
        setTeam(teamTemp)
        headlePutTeamData()
      } else {
        setEdit(true)
      }
    } else {
      setTeamTemp(team)
      setEdit(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleDeleteTeam = () => {
    cancelParticipate.mutate(team.teamId)
  }

  const cancelParticipate = useMutation(deleteTeam, {
    onSuccess: () => {
      navigate('/mypage/teamlist')
    },
    onError: (error) => console.error('팀 해체 실패:', error),
  })

  const handleWithdrawTeam = () => {
    withdrawTeam.mutate(team.teamId)
  }

  const withdrawTeam = useMutation(WithdrawTeam, {
    onSuccess: () => {
      navigate('/mypage/teamlist')
    },
    onError: (error) => {
      console.error('팀 탈퇴 실패:', error)
      alert('팀 탈퇴에 실패하였습니다.')
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && ev.target.result) {
          setTeamTemp((prev) => ({
            ...prev,
            teamImage: ev.target?.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const headlePutTeamData = () => {
    handleFormData()
  }

  const handleFormData = () => {
    const formData = new FormData()
    const teamRequestDto: TeamRequestDto = {
      teamId: teamTemp.teamId,
      teamName: teamTemp.teamName,
      teamDescription: teamTemp.teamDescription,
    }
    if (teamTemp.teamImage && teamTemp.teamImage.startsWith('data:image')) {
      const base64Response = teamTemp.teamImage.split(',')[1]
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
  const data = useMutation(putTeam)

  const base64ToBlob = (base64: string, mime: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mime })
  }

  const handleOnChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (key === 'name') setTeamTemp((prev) => ({ ...prev, teamName: event.target.value }))
    else setTeamTemp((prev) => ({ ...prev, teamDescription: event.target.value }))
  }

  return (
    <div className={styles.teamlist_wrap}>
      {team ? (
        <div className={styles.teamlist}>
          <div className={styles.head}>
            <div>{`Team > 팀목록 > ${team.teamName}`}</div>
            <div className={styles.btn}>
              {team.isLeader ? (
                ''
              ) : (
                // <div>
                //   <button type={'button'} onClick={() => setIsOpen(true)}>
                //     {'팀 해체하기'}
                //   </button>
                //   <ConfirmModal
                //     isOpen={isOpen}
                //     handleClose={handleClose}
                //     title="팀을 해체하시겠습니까?"
                //     handleData={handleDeleteTeam}
                //   />
                // </div>
                <div>
                  <button type={'button'} onClick={() => setIsOpen(true)}>
                    {'팀 탈퇴하기'}
                  </button>
                  <ConfirmModal
                    isOpen={isOpen}
                    handleClose={handleClose}
                    title="팀에서 탈퇴하시겠습니까?"
                    handleData={handleWithdrawTeam}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.team}>
              <div className={styles.team_logo}>
                <ProfileImg
                  imgUrl={teamTemp.teamImage}
                  imgName={'팀이미지'}
                  name={'teamdetail'}
                  edit={edit}
                  onChange={handleImageChange}
                />
              </div>
              <div className={styles.team_summary}>
                {edit ? (
                  <div className={styles.team_name}>
                    <input
                      id={'teamName'}
                      value={teamTemp.teamName}
                      placeholder={team.teamName}
                      onChange={(event) => handleOnChange('name', event)}
                    />
                    <div className={styles.btn}>
                      <button type={'button'} onClick={() => handleClickEdit('edit')}>
                        {'수정하기'}
                      </button>
                      <button type={'button'} onClick={() => handleClickEdit('cancel')}>
                        {'취소하기'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.team_name}>
                    <span>{team.teamName}</span>
                    {team.isLeader ? (
                      <button type={'button'} onClick={() => handleClickEdit('edit')}>
                        <img src={Edit} alt={'편집'} />
                        <p>{'수정하기'}</p>
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                )}

                {edit ? (
                  <div className={styles.team_description}>
                    <textarea
                      id={'teamDescription'}
                      value={teamTemp.teamDescription}
                      placeholder={team.teamDescription}
                      onChange={(event) => handleOnChange('description', event)}
                    />
                  </div>
                ) : (
                  <div>
                    <div>{team.teamDescription}</div>
                  </div>
                )}
              </div>
              <div>
                <button
                  type={'button'}
                  className={styles.team_clipbord}
                  onClick={() => handleCopyClipBoard(`${team.teamCode}`)}
                >
                  <img src={LinkImg} alt={'대회링크'} />
                  <p>{'초대링크'}</p>
                </button>
              </div>
            </div>
            <div className={styles.team_content}>
              <div className={styles.tap}>
                <button
                  type={'button'}
                  className={`${styles.tap} ${tap === true ? styles.active : ''}`}
                  onClick={() => setTap(true)}
                  disabled={tap === true}
                >
                  {'개최 대회'}
                </button>
                <button
                  type={'button'}
                  className={`${styles.tap} ${tap === false ? styles.active : ''}`}
                  onClick={() => setTap(false)}
                  disabled={tap === false}
                >
                  {'인원'}
                </button>
              </div>
              <div className={styles.content}>{tap ? <TeamDetailContest /> : <TeamMember id={team.teamId} />}</div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Team
