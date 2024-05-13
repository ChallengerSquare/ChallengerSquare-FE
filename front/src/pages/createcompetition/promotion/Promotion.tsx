import React from 'react'
import { useSetRecoilState } from 'recoil'
import { stepProps } from '@/types/step'
import Button from '@/components/Button/Button'
import CustomEditor from '@/components/Editor/CustomEditor'
import { competitionForm } from '../store'
import styles from './Promotion.module.scss'

const Promotion = ({ prevStep }: stepProps) => {
  const setCompetitionForm = useSetRecoilState(competitionForm)

  const handlePrevStep = (markdown: string) => {
    // Recoil 상태 업데이트
    setCompetitionForm((prevForm) => ({
      ...prevForm,
      contestCreateRequestDto: {
        ...prevForm.contestCreateRequestDto,
        contestContent: markdown,
      },
    }))

    // 이전 단계로 이동
    if (prevStep) prevStep()
  }

  const handleCompetitionForm = () => {}
  return (
    <>
      <div className={styles.header}>대회 세부 내용을 작성해주세요.</div>
      <div className={styles.sub_header}>대회 내용, 이미지 첨부</div>
      <div>
        {/* CustomEditor 컴포넌트에서 작성한 내용을 받아서 처리 */}
        <CustomEditor onGetMarkdown={handlePrevStep} />
      </div>
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={() => handlePrevStep('')}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="competition_submit_btn" onClick={handleCompetitionForm}>
            대회 등록
          </Button>
        </div>
      </div>
    </>
  )
}

export default Promotion
