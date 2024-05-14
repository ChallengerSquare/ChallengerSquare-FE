import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { useEffect, useState } from 'react'
import { getLeaderUserList, getUserList } from '@services/team'

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
  const [memberList, setMemberList] = useState<MemberData[]>([
    {
      memberName: '',
      memberEmail: '',
    },
  ])

  useEffect(() => {
    getLeaderUserList(id).then((response) => {
      if (response.status === 200) {
        setMemberList(response.data)
      } else if (response.code === 'G-029') {
        getUserList(id).then(({ data }) => {
          setMemberList(data)
        })
      }
    })
  }, [])

  return (
    <div className={styles.team_member}>
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
              <button type={'button'} className={styles.approve}>
                {'승인'}
              </button>
              <button type={'button'} className={styles.reject}>
                {'거부'}
              </button>
            </div>
          ) : (
            <div className={styles.line_tail}>{''}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TeamMember
