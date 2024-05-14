import { useState, useRef, useEffect } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { stepProps } from '@/types/step'
import Button from '@/components/Button/Button'
import { categorys } from '@/types/category'
import CustomEditor from '@/components/Editor/CustomEditor'
import Modal from '@components/Modal/Modal'
import logoIcon from '@svgs/logo/challSv2.svg'
import { CreateCompetitionDto } from '@/types/api'
import { competitionForm } from '../store'
import styles from './Promotion.module.scss'

const Promotion = ({ prevStep }: stepProps) => {
  const form: CreateCompetitionDto = useRecoilValue(competitionForm)
  const [isOpen, setIsOpen] = useState(false)
  const editorRef = useRef<{ handleStore: () => void }>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleOpen = () => {
    if (editorRef.current) {
      editorRef.current.handleStore()
    }
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleRegisterCompeition = () => {}
  console.log(form.contestCreateRequestDto.contestPeriod.end)
  return (
    <>
      <div className={styles.header}>대회 세부 내용을 작성해주세요.</div>
      <div className={styles.sub_header}>대회 내용, 이미지 첨부</div>
      <CustomEditor ref={editorRef} initialContent={form.contestCreateRequestDto.contestContent} />
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={prevStep}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="competition_submit_btn" onClick={handleOpen}>
            대회 등록
          </Button>
          <Modal isOpen={isOpen} onClose={handleClose}>
            <div className={styles.modal_header}>
              <img src={logoIcon} alt="logo" className={styles.logo} />
              <div className={styles.modal_header_title}>대회를 등록하시겠습니까?</div>
            </div>
            <div className={styles.modal_container}>
              <div className={styles.modal_form}>
                <div className={styles.element}>
                  <div className={styles.label}>카테고리 : </div>
                  <div className={styles.content}>
                    {categorys[parseInt(form.contestCreateRequestDto.contestCategory, 10) - 1].category}
                  </div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>대회명 : </div>
                  <div className={styles.content}>{form.contestCreateRequestDto.contestTitle}</div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>장소 : </div>
                  <div className={styles.content}>
                    {form.contestCreateRequestDto.contestLocation
                      ? form.contestCreateRequestDto.contestLocation
                      : '온라인'}
                  </div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>모집 기간 : </div>
                  <div className={styles.content}>
                    {form.contestCreateRequestDto.registrationPeriod.start} ~&nbsp;
                    {form.contestCreateRequestDto.registrationPeriod.end}
                  </div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>대회 기간 : </div>
                  <div className={styles.content}>
                    {form.contestCreateRequestDto.contestPeriod.start} ~&nbsp;
                    {form.contestCreateRequestDto.contestPeriod.end}
                  </div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>모집 인원 : </div>
                  <div className={styles.content}>{form.contestCreateRequestDto.contestRegistrationNum} 명</div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>참가비 : </div>
                  <div className={styles.content}> {form.contestCreateRequestDto.contestFee} 원</div>
                </div>
                <div className={styles.element}>
                  <div className={styles.label}>수상내역 : </div>
                  <div className={styles.content}>
                    <div className={styles.reward}>
                      {form.contestCreateRequestDto.contestAwards.map((item, index) => (
                        <div>
                          {item.awardsName}({item.awardsCount}) : {item.awardsPrize}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <div>
                <Button variation="white default" onClick={handleClose}>
                  이전
                </Button>
              </div>
              <div>
                <Button variation="purple default" onClick={handleRegisterCompeition}>
                  다음
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Promotion
