import Button from '@/components/Button/Button'
import styles from './CompetitoinDetailContent.module.scss'

interface Props {
  competitionId: string | undefined
}

const CompetitoinContent = ({ competitionId }: Props) => {
  const path = process.env.PUBLIC_URL

  return (
    <>
      <div className={styles.poster}>
        <img src={`${path}/images/competition/poster.png`} alt="포스터" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <ul>
            <li>
              <span>SSAFY 프로젝트</span>
            </li>
            <li>SSAFY</li>
          </ul>
        </div>
        <div className={styles.detail}>
          <ul>
            <li>
              <span>일시</span> 2024.04.08 ~ 2024.05.20
            </li>
            <li>
              <span>장소</span> 서울특별시 강남구 테헤란로 212
            </li>
            <li>
              <span>참가비</span> 0원 <p className="point">무료</p>
            </li>
            <li>
              <span>모집인원</span> 1000명 <p className="point">선착순</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.btn}>
        {/* 현재 날짜가 해당하지 않으면 비활성화 */}
        {/* 버튼 클릭시 참가 신청 폼으로 이동 */}
        <Button variation="purple">참가하기</Button>
        <p>2024.04.06 ~ 2024.04.18</p>
      </div>
    </>
  )
}

export default CompetitoinContent
