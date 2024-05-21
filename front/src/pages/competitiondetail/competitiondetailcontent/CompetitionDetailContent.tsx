import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { cancelParticipateContest, deleteContest } from '@/services/competition'
import { Contest } from '@/types/competition'
import { DeleteContest } from '@/types/api'
import BaseImg from '@/components/BaseImg/BaseImg'
import Button from '@/components/Button/Button'
import ConfirmModal from '@components/ConfirmModal/ConfirmModal'
import styles from '@/pages/competitiondetail/competitiondetailcontent/CompetitionDetailContent.module.scss'
import { useRecoilValue } from 'recoil'
import { userState } from '@/stores/userState'

interface Props {
  competition: Contest
}

const CompetitionContent = ({ competition }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const user = useRecoilValue(userState)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }
  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()} 원`
  }

  const isRegistrationOpen = () => {
    const currentDate = new Date()
    const startDate = new Date(competition.registrationPeriod.start)
    const endDate = new Date(competition.registrationPeriod.end)

    return currentDate >= startDate && currentDate <= endDate
  }

  const cancelParticipate = useMutation(cancelParticipateContest, {
    onSuccess: (response) => {
      console.log('참가 취소 성공')
      window.location.reload()
    },
    onError: (error) => {
      console.error('참가 취소 실패:', error)
      alert('참가 취소에 실패하였습니다.')
    },
  })

  const handleCancelParticipation = () => {
    cancelParticipate.mutate(competition.contestId)
  }

  const deleteCompetition = useMutation(deleteContest, {
    onSuccess: (response) => {
      console.log('대회 취소 성공')
      window.location.reload()
    },
    onError: (error) => {
      console.error('대회 취소 실패:', error)
      alert('대회 취소에 실패하였습니다.')
    },
  })

  const handleDeleteCompetition = () => {
    const data: DeleteContest = {
      contestId: competition.contestId,
      contestState: 'L',
    }
    deleteCompetition.mutate(data)
  }

  const renderButton = () => {
    const role =
      competition.contestState === 'L' || competition.contestState === 'D'
        ? '대회마감'
        : competition.contestState === 'S'
          ? '진행중'
          : competition.contestState === 'E'
            ? '대회종료'
            : competition.contestState === 'P'
              ? '진행전'
              : competition.isOwnerTeamMember
                ? '대회취소'
                : competition.isParticipantsLeader
                  ? '신청취소'
                  : '참가하기'
    // isleader : 해당 대회 신청했는지
    switch (role) {
      case '신청취소':
        return (
          <>
            <Button variation="purple" disabled={!isRegistrationOpen()} onClick={() => setIsOpen(true)}>
              {role}
            </Button>
            <ConfirmModal
              isOpen={isOpen}
              handleClose={handleClose}
              title="신청을 취소하시겠습니까?"
              handleData={handleCancelParticipation}
            />
          </>
        )
      case '대회취소':
        return (
          <>
            <Button variation="purple" onClick={() => setIsOpen(true)}>
              {role}
            </Button>
            <ConfirmModal
              isOpen={isOpen}
              handleClose={handleClose}
              title="대회를 취소하시겠습니까?"
              handleData={handleDeleteCompetition}
            />
          </>
        )
      case '참가하기':
        return (
          <>
            <Button
              variation="purple"
              disabled={!isRegistrationOpen()}
              onClick={() => {
                if (!user.userName) navigate('/auth')
                else {
                  const features = 'toolbar=no,menubar=no,width=800,height=700,left=100,top=100'
                  window.open(`/competition/participate/write/${competition.contestId}`, '_blank', features)
                }
              }}
            >
              {role}
            </Button>
          </>
        )
      default:
        return (
          <>
            <Button
              variation="purple"
              disabled={true}
              onClick={() => {
                const features = 'toolbar=no,menubar=no,width=700,height=700,left=100,top=100'
                window.open(`/form/write/${competition.contestId}`, '_blank', features)
              }}
            >
              {role}
            </Button>
          </>
        )
    }
  }
  return (
    <>
      <div className={styles.poster}>
        <BaseImg imgUrl={competition.contestImage} imgName={'포스터'} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <ul>
            <li>
              <span>{competition.contestTitle}</span>
            </li>
            <li>{competition.teamName}</li>
          </ul>
        </div>
        <div className={styles.detail}>
          <ul>
            <li>
              <span>일시</span> {competition.contestPeriod.start} ~ {competition.contestPeriod.end}
            </li>
            <li>
              <span>장소</span> {competition.contestLocation}
            </li>
            <li>
              <span>참가비</span> {formatCurrency(competition.contestFee)}
              {competition.contestFee === 0 && <p className="point">무료</p>}
            </li>
            <li>
              <span>모집인원</span> {competition.contestRegistrationNum} 명{' '}
              {competition.isPriority && <p className="point">선착순</p>}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.btn}>
        {renderButton()}
        <p>
          {competition.registrationPeriod.start} ~ {competition.registrationPeriod.end}
        </p>
      </div>
    </>
  )
}

export default CompetitionContent
