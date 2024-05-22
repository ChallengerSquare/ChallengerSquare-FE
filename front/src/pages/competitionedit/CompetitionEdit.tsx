import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import Navbar from '@/components/Navbar/Navbar'
import { getCompetitionDetails, modifyContestContent } from '@/services/competition'
import Button from '@/components/Button/Button'
import CustomEditor from '@/components/Editor/CustomEditor'
import { ApiResponse, UpdateCompetitionRequestDto } from '@/types/api'
import ModifyModal from './ModifyModal/ModifyModal'
import styles from './CompetitionEdit.module.scss'

const CompetitionEdit = () => {
  const queryclient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const editorRef = useRef<{ getMarkdown: () => void }>(null)
  const { competitionId } = useParams<{ competitionId: string }>()
  const [content, setContent] = useState<string>('')
  const { data: response } = useQuery<ApiResponse>(
    ['getCompetitionDetails', competitionId],
    () => getCompetitionDetails(competitionId!),
    {
      enabled: !!competitionId,
    },
  )
  const modifyData = useMutation(modifyContestContent, {
    onSuccess: () => {
      queryclient.invalidateQueries('getCompetitionDetails')
      setIsOpen(true)
    },
    onError: (error) => {
      console.error('대회 수정 실패:', error)
      alert('대회 수정에 실패하였습니다.')
    },
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    if (response && response.data) setContent(response?.data.contestContent)
  }, [isOpen, response])

  const handleOpen = () => {
    const responseDto = { ...response?.data }
    if (editorRef.current) {
      const markdown = editorRef.current.getMarkdown()
      responseDto.contestContent = markdown
      const request: UpdateCompetitionRequestDto = {
        contestId: responseDto.contestId,
        contestTitle: responseDto.contestTitle,
        contestContent: responseDto.contestContent,
        contestLocation: responseDto.contestLocation,
        teamId: responseDto.teamId,
        registrationPeriod: responseDto.registrationPeriod,
        contestPeriod: responseDto.contestPeriod,
        contestRegistrationNum: responseDto.contestRegistrationNum,
        contestFee: responseDto.contestFee,
        contestPhone: responseDto.contestPhone,
        isPriority: responseDto.isPriority,
        contestCategory: responseDto.contestCategory,
        contestAwards: responseDto.contestAwards,
      }

      modifyData.mutate(request)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className={styles.background}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.title}>대회 내용 수정</div>
          <div className={styles['main-box']}>
            <div className={styles.header}>대회 세부 내용을 작성해주세요.</div>
            <div className={styles.sub_header}>대회 내용, 이미지 첨부</div>
            <CustomEditor ref={editorRef} initialContent={content} />
            <div className={styles.footer}>
              <div>
                <Button variation="competition_submit_btn" onClick={handleOpen}>
                  수정하기
                </Button>
                <ModifyModal isOpen={isOpen} handleClose={handleClose} contestId={competitionId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompetitionEdit
