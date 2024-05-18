import React, { useState, useEffect } from 'react'
import { Viewer } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { useNavigate } from 'react-router-dom'
import styles from './CompetitionDetailInfo.module.scss'

interface Props {
  content: string | undefined
  isOwnerTeamMember: boolean
  contestId: number
}

const CompetitionDetailInfo = ({ content, isOwnerTeamMember, contestId }: Props) => {
  const [data, setdata] = useState([])
  const navigate = useNavigate()
  useEffect(() => {}, [])

  return (
    <>
      <div className={styles.container}>
        {content === undefined ? (
          <div className={styles.empty}>
            <p>등록된 상세정보가 없습니다.</p>
          </div>
        ) : (
          <div className={styles.content}>
            <Viewer initialValue={content} font-size={20} />
          </div>
        )}
      </div>
      {isOwnerTeamMember ? (
        <div className={styles.btn}>
          <button
            type="button"
            onClick={() => {
              navigate(`/competition/edit/${contestId}`)
            }}
          >
            + 수정하기
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default CompetitionDetailInfo
