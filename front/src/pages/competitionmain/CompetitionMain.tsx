import { useEffect, useState } from 'react'
import { ContestData } from '@/types/competition'
import { SearchResponse, SearchRequest } from '@/types/api'
import { getCompetitionList } from '@/services/competition'
import { Link } from 'react-router-dom'
import useScrollTop from '@/hooks/useScrollTop'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionList from '@/components/Competition/CompetitionList'
import SearchBar from '@/components/SearchBar/SearchBar'
import LandingImg from '@svgs/Landing/LandingImg.webp'
import styles from './CompetitionMain.module.scss'

const CompetitionMain = () => {
  useScrollTop()
  const [famousCompetitionList, setfamousCompetitionList] = useState<ContestData[]>([])
  const [dueCompetitionList, setDueCompetitionList] = useState<ContestData[]>([])

  useEffect(() => {
    /* 인기 있는 대회 조회 API */
    const famousCompetitionListParams: SearchRequest = {
      orderBy: 2,
      isEnd: false,
      page: 0,
      size: 12,
    }
    getCompetitionList(famousCompetitionListParams).then(({ data }) => {
      const famousTeamListData: ContestData[] = data.content.map((item: SearchResponse) => ({
        contestId: item.contestId,
        contestTitle: item.contestTitle,
        contestImage: `${item.contestImage === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null' ? '' : item.contestImage}`,
        contestDate: `${item.contestPeriod.start} ~ ${item.contestPeriod.end}`,
      }))
      setfamousCompetitionList(famousTeamListData)
    })

    /* 마감 임박 대회 조회 API */
    const dueTeamListParams: SearchRequest = {
      orderBy: 1,
      isEnd: false,
      page: 0,
      size: 12,
    }
    getCompetitionList(dueTeamListParams).then(({ data }) => {
      const dueCompetitionListData: ContestData[] = data.content.map((item: SearchResponse) => ({
        contestId: item.contestId,
        contestTitle: item.contestTitle,
        contestImage: `${item.contestImage === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null' ? '' : item.contestImage}`,
        contestDate: `${item.contestPeriod.start} ~ ${item.contestPeriod.end}`,
      }))
      setDueCompetitionList(dueCompetitionListData)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Navbar enableScrollEffect />
      <div className={styles.background}>
        <img src={LandingImg} alt={'background'} />
      </div>
      <div className={styles.head}>
        <div className={styles.content}>
          <div className={styles.title}>
            <div>
              행사 개최, 관리, 참여를 모두 <span>한 곳</span>에서.
            </div>
            <div>
              수상 내역, 참가 확인은 <span>블록체인</span>으로 안전하고 확실하게.
            </div>
          </div>
          <SearchBar text={'원하는 대회를 입력해주세요'} openBtn openBtnColor={'white'} url={'search'} />
        </div>
      </div>
      <div className={styles.searchlist}>
        <CompetitionList text={'인기 있는 대회를 살펴보세요'} contestList={famousCompetitionList} />
        <CompetitionList text={'마감 임박한 대회를 살펴보세요'} contestList={dueCompetitionList} />
      </div>
      <div className={styles.more}>
        <Link to={'/competition/search'}>
          <div className={styles.btn}>{'더 많은 대회 보러가기'}</div>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default CompetitionMain
