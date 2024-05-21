import styles from '@/pages/mypage/teams/Teams.module.scss'
import { useEffect, useState } from 'react'
import { deleteMember, getLeaderUserList, getUserList, updateMemberParticipants } from '@services/team'
import EmptyImg from '@/components/EmptyImg/EmptyImg'

interface TeamMemberProps {
  id: number
}

interface MemberData {
  participantsId?: number
  memberCode?: number
  memberName: string
  memberEmail: string
  isApprove?: boolean
}

const TeamMember = ({ id }: TeamMemberProps) => {
  const [memberList, setMemberList] = useState<MemberData[]>([])
  const [loading, setLoading] = useState(true)
  const [isLeader, setIsLeader] = useState(false)

  const setUserList = () => {
    getLeaderUserList(id).then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        setMemberList(response.data)
        setIsLeader(true)
      } else if (response.code === 'G-029') {
        getUserList(id).then(({ data }) => {
          console.log(data)
          setMemberList(data)
        })
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    setUserList()
  }, [])

  const updateMemberStatus = (id: number | undefined, isApprove: boolean) => {
    if (id != undefined) {
      updateMemberParticipants(id, isApprove).then((response) => {
        if (response.status === 200) {
          setUserList()
        }
      })
    }
  }

  const handledeleteMember = (id: number | undefined) => {
    if (id) {
      deleteMember(id).then((response) => {
        if (response.status === 200) {
          setUserList()
        }
      })
    }
  }

  return (
    <div>
      {loading ? (
        ''
      ) : (
        <div className={styles.team_member}>
          {memberList.length > 0 ? (
            <div>
              {memberList.map((member, index) => (
                <div key={index} className={`${styles.line} ${member.isApprove === false ? styles.notApprove : ''}`}>
                  <div className={styles.line_head}>{''}</div>
                  <div className={styles.line_body}>
                    <div>
                      <span>{member.memberName}</span>
                      {member.memberEmail}
                    </div>
                  </div>
                  {member.isApprove === false ? (
                    <div className={styles.line_tail}>
                      <button
                        type={'button'}
                        className={styles.approve}
                        onClick={() => updateMemberStatus(member.participantsId, true)}
                      >
                        {'승인'}
                      </button>
                      <button
                        type={'button'}
                        className={styles.reject}
                        onClick={() => updateMemberStatus(member.participantsId, false)}
                      >
                        {'거부'}
                      </button>
                    </div>
                  ) : isLeader && index != 0 ? (
                    <div className={styles.line_tail}>
                      <button
                        type={'button'}
                        className={styles.reject}
                        onClick={() => handledeleteMember(member.participantsId)}
                      >
                        {'퇴출'}
                      </button>
                    </div>
                  ) : (
                    <div className={styles.line_tail}>{''}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyImg text={'팀원 목록이 비었습니다.'} />
          )}
        </div>
      )}
    </div>
  )
}

export default TeamMember
