import { stepProps } from '@/types/step'
import Button from '@/components/Button/Button'
import plusIcon from '@svgs/plus_icon.svg'
import styles from './Reward.module.scss'

const Reward = ({ prevStep, nextStep }: stepProps) => {
  return (
    <>
      <div className={styles.header}>대회 시상 정보를 입력해 주세요.</div>
      <div className={styles.container}>
        <div className={styles.element}>
          <div className={styles.title_one}>시상명</div>
          <div className={styles.title_two}>상 개수</div>
          <div className={styles.title_three}>수여금액</div>
        </div>
        <div className={styles.element}>
          <input type="text" className={styles.award_name} />
          <input type="text" className={styles.award_count} />
          <input type="text" className={styles.award_price} />
          <button type="button" className={styles.plus_btn}>
            <img src={plusIcon} alt="Plus Icon" />
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={prevStep}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="purple default" onClick={nextStep}>
            다음
          </Button>
        </div>
      </div>
    </>
  )
}

export default Reward
