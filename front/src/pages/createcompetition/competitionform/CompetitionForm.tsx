import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { stepProps } from '@/types/step'
import Dropdown from '@/components/Dropdown/Dropdown'
import { competitionForm } from '../store'
import styles from './CompetitionForm.module.scss'

interface Category {
  index: number
  category: string
}

const CompetitionForm = ({ prevStep, nextStep }: stepProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

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
            <div className={styles.dropdown}>
              <Dropdown<Category>
                options={categorys}
                onSelect={(category: Category) => {
                  setSelectedCategory(category)
                }}
                element={(item) => item.category}
                width="200px"
              />
            </div>
          </div>
          <div className={styles.element}>
            <div className={styles.label}>
              <span className={styles.required}>*</span> &nbsp; 대회명
            </div>
            <input type="text" className={styles.input_box} onChange={(e) => {}} placeholder="대회명" />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>
              <span className={styles.required}>*</span> &nbsp; 장소
            </div>
            <input type="text" className={styles.input_box} onChange={(e) => {}} placeholder="대회명" />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompetitionForm
