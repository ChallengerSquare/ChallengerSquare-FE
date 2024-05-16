import Button from '@/components/Button/Button'
import baseImg from '@images/baseImg.png'
import styles from './CompetitoinDetailContent.module.scss'

interface Props {
  competition: Contest
}

interface Contest {
  contestId: number
  contestTitle: string
  contestContent: string
  contestImage: string
  teamName: string
  teamId: number
  registrationPeriod: {
    start: string
    end: string
  }
  contestPeriod: {
    start: string
    end: string
  }
  contestRegistrationNum: number
  contestFee: number
  contestPhone: string
  isPriority: boolean
  contestCategory: string
  contestLocation: string
  isLeader: boolean
  participantState: string
  contestState: string
  contestAwards: Award[]
}

interface Award {
  awardsId: number
  awardsName: string
  awardsCount: number
  awardsPrize: number
}

const CompetitoinContent = ({ competition }: Props) => {
  const isRegistrationOpen = () => {
    const currentDate = new Date()
    const startDate = new Date(competition.registrationPeriod.start)
    const endDate = new Date(competition.registrationPeriod.end)

    return currentDate >= startDate && currentDate <= endDate
  }

  return (
    <>
      <div className={styles.poster}>
        <img
          src={
            competition.contestImage === '' ||
            competition.contestImage === null ||
            competition.contestImage === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null'
              ? baseImg
              : competition.contestImage
          }
          alt={'포스터'}
        />
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
              <span>참가비</span> {competition.contestFee}
              {' 원 '}
              {competition.contestFee === 0 && <p className="point">무료</p>}
            </li>
            <li>
              <span>모집인원</span> {competition.contestRegistrationNum}
              {' 명 '}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.btn}>
        <Button variation="purple" disabled={isRegistrationOpen() && competition.isLeader}>
          참가하기
        </Button>
        <p>
          {competition.registrationPeriod.start} ~ {competition.registrationPeriod.end}
        </p>
      </div>
    </>
  )
}

export default CompetitoinContent
