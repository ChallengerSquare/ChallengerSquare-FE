import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContestData } from '@/types/competition'
import { searchState } from '@/pages/competition-search/store'
import { Search } from '@/types/search'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionList from '@/components/Competition/CompetitionList'
import SearchBar from '@/components/SearchBar/SearchBar'
import LandingImg from '@images/competition/SearchPageLanding.gif'
import styles from './Competition.module.scss'

const Competition = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useRecoilState<Search>(searchState)
  const [famousTeamList, setFamousTeamList] = useState<ContestData[]>([
    {
      contestId: 0,
      contestTitle: '',
      contestImage: '',
      contestDate: '',
    },
  ])
  const [dueTeamList, setDueTeamList] = useState<ContestData[]>([
    {
      contestId: 0,
      contestTitle: '',
      contestImage: '',
      contestDate: '',
    },
  ])

  useEffect(() => {
    /* 인기 있는 대회 조회 API */
    const famousTeamListData = [
      { contestId: 1, contestImage: '', contestTitle: '이미지1', contestDate: '2024-04-29' },
      { contestId: 2, contestImage: '', contestTitle: '이미지2', contestDate: '2024-04-29' },
      { contestId: 3, contestImage: '', contestTitle: '이미지3', contestDate: '2024-04-29' },
      { contestId: 4, contestImage: '', contestTitle: '이미지4', contestDate: '2024-04-29' },
      { contestId: 5, contestImage: '', contestTitle: '이미지5', contestDate: '2024-04-29' },
    ]
    setFamousTeamList(famousTeamListData)
    /* 인기 있는 대회 조회 API */
    const dueTeamListData = [
      { contestId: 1, contestImage: '', contestTitle: '이미지1', contestDate: '2024-04-29' },
      { contestId: 2, contestImage: '', contestTitle: '이미지2', contestDate: '2024-04-29' },
      { contestId: 3, contestImage: '', contestTitle: '이미지3', contestDate: '2024-04-29' },
      { contestId: 4, contestImage: '', contestTitle: '이미지4', contestDate: '2024-04-29' },
      { contestId: 5, contestImage: '', contestTitle: '이미지5', contestDate: '2024-04-29' },
    ]
    setDueTeamList(dueTeamListData)
    setSearch((prev) => ({ ...prev, keyword: '', category: 0 }))
  }, [])

  const handleSearch = async (searchQuery: string | undefined) => {
    setSearch((prev) => ({ ...prev, keyword: searchQuery }))
    navigate(`/competition/search?keyword=${searchQuery}`)
  }

  const handlekeyword = (key: string) => {
    setSearch((prev) => ({ ...prev, keyword: key }))
  }

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
          <SearchBar
            text={'원하는 대회를 입력해주세요'}
            openBtn
            openBtnColor={'white'}
            onClick={handleSearch}
            onChange={handlekeyword}
          />
        </div>
      </div>
      <div className={styles.searchlist}>
        <CompetitionList text={'인기 있는 대회를 살펴보세요'} contestList={famousTeamList} />
        <CompetitionList text={'마감 임박한 대회를 살펴보세요'} contestList={dueTeamList} />
      </div>
    </div>
  )
}

export default Competition
