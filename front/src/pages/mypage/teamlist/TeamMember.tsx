import styles from '@/pages/mypage/teamlist/TeamList.module.scss'
import { useEffect, useState } from 'react'

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
    /* 팀 목록 API 호출 */
    const dummyData = [
      {
        memberName: '김땡땡',
        memberEmail: '김땡땡@gmail.com',
        isApprove: false,
      },
      {
        memberName: '이땡땡',
        memberEmail: '이땡땡@gmail.com',
      },
      {
        memberName: '최땡땡',
        memberEmail: '최땡땡@gmail.com',
      },
      {
        memberName: '최땡땡',
        memberEmail: '최땡땡@gmail.com',
      },
      {
        memberName: '최땡땡',
        memberEmail: '최땡땡@gmail.com',
      },
    ]
    setMemberList(dummyData)
  }, [])

  return (
    <div className={styles.team_member}>
      {memberList.map((member) => (
        <div className={`${styles.line} ${member.isApprove === false ? styles.notApprove : ''}`}>
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
