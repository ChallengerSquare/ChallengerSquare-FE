import { useState } from 'react'
import { stepProps } from '@/types/step'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import Button from '@/components/Button/Button'
import plusIcon from '@svgs/plus_icon.svg'
import minusIcon from '@svgs/minus_icon.svg'
import { CreateCompetitionDto } from '@/types/api'
import { competitionForm } from '../store'
import styles from './Reward.module.scss'

const Reward = ({ prevStep, nextStep }: stepProps) => {
  const [awards, setAwards] = useState([{ name: '', count: '', amount: '' }])
  const setCompetitionForm = useSetRecoilState(competitionForm)
  const form: CreateCompetitionDto = useRecoilValue(competitionForm)
  const handleAddAward = () => {
    if (awards.length < 10) {
      setAwards([...awards, { name: '', count: '', amount: '' }])
    }
  }

  const handleRemoveAward = (index: number) => {
    setAwards(awards.filter((_, idx) => idx !== index))
  }

  const handleInputChange = (index: number, field: string, value: string) => {
    const newAwards = awards.map((award, idx) => {
      if (idx === index) {
        return { ...award, [field]: value }
      }
      return award
    })
    setAwards(newAwards)
  }

  const handleNextStep = () => {
    setCompetitionForm((prev) => ({
      ...prev,
      contestCreateRequestDto: {
        ...prev.contestCreateRequestDto,
        contestAwards: awards
          .filter((award) => award.count.trim() !== '' && parseInt(award.count, 10) > 0)
          .map((award) => ({
            awardsName: award.name,
            awardsCount: parseInt(award.count, 10),
            awardsPrize: parseInt(award.amount, 10),
          })),
      },
    }))
    if (nextStep) nextStep()
  }
  return (
    <>
      <div className={styles.header}>대회 시상 정보를 입력해 주세요.</div>
      <div className={styles.notice}>(선택, 최대 10개 입력 가능)</div>
      <div className={styles.container}>
        <div className={styles.element}>
          <div className={styles.title_one}>시상명</div>
          <div className={styles.title_two}>상 개수</div>
          <div className={styles.title_three}>수여금액</div>
        </div>
        {awards.map((award, index) => (
          <div key={index} className={styles.element}>
            <input
              type="text"
              className={styles.award_name}
              value={award.name}
              placeholder="시상명"
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
            <input
              type="text"
              className={styles.award_count}
              value={award.count}
              onChange={(e) => handleInputChange(index, 'count', e.target.value)}
            />
            <input
              type="text"
              className={styles.award_price}
              value={award.amount}
              onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
            />
            {index === 0 ? (
              <button type="button" className={styles.award_btn} onClick={handleAddAward}>
                <img src={plusIcon} alt="Plus Icon" />
              </button>
            ) : (
              <button type="button" className={styles.award_btn} onClick={() => handleRemoveAward(index)}>
                <img src={minusIcon} alt="Minus Icon" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={prevStep}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="purple default" onClick={handleNextStep}>
            다음
          </Button>
        </div>
      </div>
    </>
  )
}

export default Reward
