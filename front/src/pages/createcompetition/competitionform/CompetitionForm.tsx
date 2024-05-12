import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { stepProps } from '@/types/step'
import Dropdown from '@/components/Dropdown/Dropdown'
import Button from '@/components/Button/Button'
import Calendar from '@/components/Calendar/Calendar'
import loadPostcode from '@services/postcode'
import ping from '@svgs/ping.svg'
import { competitionForm } from '../store'
import styles from './CompetitionForm.module.scss'

interface Category {
  index: number
  category: string
}

const CompetitionForm = ({ prevStep, nextStep }: stepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [competitionName, setCompetitionName] = useState<string>('')
  const [selectedButton, setSelectedButton] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isOffLine, setIsOffLine] = useState<boolean>(false)
  const [addressDetails, setAddressDetails] = useState({
    postcode: '',
    roadAddress: '',
    detailAddress: '',
  })

  const categorys: Category[] = [
    { index: 1, category: 'IT' },
    { index: 2, category: '게임' },
    { index: 3, category: '예술' },
    { index: 4, category: '스포츠' },
    { index: 5, category: '아이디어' },
    { index: 6, category: '기타' },
  ]
  return (
    <>
      <div className={styles.header}>대회 정보를 입력해주세요.</div>
      <div className={styles.content}>
        <div className={styles.thumbnail}>포스터</div>
        <div className={styles.form}>
          <div className={styles.element}>
            <div className={styles.label}>
              <span className={styles.required}>*</span> &nbsp; 분류
            </div>
            <Dropdown<Category>
              options={categorys}
              onSelect={(category: Category) => {
                setSelectedCategory(category)
              }}
              element={(item) => item.category}
              width="120px"
            />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>
              <span className={styles.required}>*</span> &nbsp; 대회명
            </div>
            <input
              type="text"
              className={styles.input_box}
              onChange={(e) => {
                setCompetitionName(e.target.value)
              }}
              placeholder="대회명을 입력하세요"
            />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>
              <span className={styles.required}>*</span> &nbsp; 장소
            </div>
            <Button
              variation={`competition_place_online ${selectedButton === 'online' ? 'competition_btn_active' : ''}`}
              onClick={() => {
                setIsOffLine(false)
                setSelectedButton('online')
              }}
            >
              온라인
            </Button>
            <div className="ml-5">
              <Button
                variation={`competition_place_offline ${selectedButton === 'offline' ? 'competition_btn_active' : ''}`}
                onClick={() => {
                  setIsOffLine(true)
                  setSelectedButton('offline')
                }}
              >
                오프라인
              </Button>
            </div>
            {isOffLine && (
              <div className="ml-4">
                <Button variation="regist_competition_btn" onClick={() => loadPostcode(setAddressDetails)}>
                  <img src={ping} alt="ping" className={styles.ping} />
                </Button>
              </div>
            )}
          </div>
          {isOffLine && (
            <div className={styles.place}>
              <input
                type="text"
                value={addressDetails.roadAddress}
                className={styles.place_box_one}
                onChange={(e) => {
                  setCompetitionName(e.target.value)
                }}
                readOnly
              />
              <input type="text" className={styles.place_box_two} placeholder="(선택)" />
            </div>
          )}
          <div className={styles.element}>
            <div className={styles.label}>
              <span className={styles.required}>*</span> &nbsp; 행사 기간
            </div>
            <Calendar selectedDate={startDate} setSelectedDate={setStartDate} minDate={new Date()} />
            <div className={styles.period}>~</div>
            <Calendar selectedDate={endDate} setSelectedDate={setEndDate} minDate={startDate} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompetitionForm
