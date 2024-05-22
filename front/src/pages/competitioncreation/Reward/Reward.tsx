import { useState, useEffect } from 'react'
import { stepProps } from '@/types/step'
import { useRecoilState } from 'recoil'
import Button from '@/components/Button/Button'
import plusIcon from '@assets/svgs/arrow/plus_icon.svg'
import minusIcon from '@assets/svgs/arrow/minus_icon.svg'
import { competitionForm } from '../store'
import styles from './Reward.module.scss'

const Reward = ({ prevStep, nextStep }: stepProps) => {
  const [form, setForm] = useRecoilState(competitionForm)
  const [awards, setAwards] = useState(() => {
    if (form.contestCreateRequestDto.contestAwards.length === 0) {
      return [{ name: '', count: '0', amount: '0' }]
    }
    return form.contestCreateRequestDto.contestAwards.map((award) => ({
      name: award.awardsName,
      count: award.awardsCount.toString(),
      amount: award.awardsPrize.toLocaleString(),
    }))
  })

  useEffect(() => {
    const initialAwards = form.contestCreateRequestDto.contestAwards.map((award) => ({
      name: award.awardsName,
      count: award.awardsCount.toString(),
      amount: award.awardsPrize.toLocaleString(),
    }))
    setAwards(initialAwards.length > 0 ? initialAwards : [{ name: '', count: '0', amount: '0' }])
  }, [form.contestCreateRequestDto.contestAwards])

  const handleAddAward = () => {
    setAwards([...awards, { name: '', count: '', amount: '' }])
  }

  const handleRemoveAward = (index: number) => {
    setAwards(awards.filter((_, idx) => idx !== index))
  }

  const handleInputChange = (index: number, field: string, value: string) => {
    if (field === 'amount') {
      const strippedValue = value.replace(/,/g, '')
      if (/^\d*$/.test(strippedValue)) {
        const formattedValue = strippedValue === '' ? '' : parseInt(strippedValue, 10).toLocaleString()
        updateAward(index, field, formattedValue)
      }
    } else {
      updateAward(index, field, value)
    }
  }

  const updateAward = (index: number, field: string, value: string) => {
    const updatedAwards = awards.map((award, idx) => {
      if (idx === index) {
        return { ...award, [field]: value }
      }
      return award
    })
    setAwards(updatedAwards)
  }

  const handleNextStep = () => {
    const validAwards = awards
      .filter((award) => parseInt(award.count, 10) > 0)
      .map((award) => ({
        awardsName: award.name,
        awardsCount: parseInt(award.count, 10),
        awardsPrize: parseInt(award.amount.replace(/,/g, ''), 10),
      }))
    setForm({
      ...form,
      contestCreateRequestDto: {
        ...form.contestCreateRequestDto,
        contestAwards: validAwards,
      },
    })
    nextStep?.()
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
