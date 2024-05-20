import React, { useState, useEffect } from 'react'
import { Viewer } from '@toast-ui/react-editor'
import styled from '@emotion/styled'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
import { useNavigate } from 'react-router-dom'
import styles from './CompetitionDetailInfo.module.scss'

interface Props {
  content: string | undefined
  isOwnerTeamMember: boolean
  contestId: number
}

const StyledViewer = styled.div`
  .toastui-editor-viewer {
    font-size: 100px; // 모든 텍스트에 대해 폰트 크기를 100px로 설정

    // 추가적으로, 특정 요소에 대해 다른 스타일을 적용할 수 있습니다.
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 120px; // 제목에 대해 더 큰 폰트 크기 설정
    }
  }
`
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
          <StyledViewer>
            <Viewer initialValue={content} />
          </StyledViewer>
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
