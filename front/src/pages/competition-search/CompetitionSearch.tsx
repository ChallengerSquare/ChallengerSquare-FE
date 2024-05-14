import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Search } from '@/types/search'
import { ContestData } from '@/types/competition'
import { searchState } from '@/pages/competition-search/store'
import styles from '@/pages/competition-search/CompetitionSearch.module.scss'
import CompetitionCategory from '@/components/Competition/CompetitionCategory'
import SearchBar from '@/components/SearchBar/SearchBar'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionSearchList from '@/components/Competition/CompetitionSearchList'
import Button from '@/components/Button/Button'
import { useRecoilState } from 'recoil'

const data = [
  { contestId: 1, contestImage: '', contestTitle: '이미지1', contestDate: '2024-04-29' },
  { contestId: 2, contestImage: '', contestTitle: '이미지2', contestDate: '2024-04-29' },
  { contestId: 3, contestImage: '', contestTitle: '이미지3', contestDate: '2024-04-29' },
  { contestId: 4, contestImage: '', contestTitle: '이미지4', contestDate: '2024-04-29' },
  { contestId: 5, contestImage: '', contestTitle: '이미지5', contestDate: '2024-04-29' },
  { contestId: 6, contestImage: '', contestTitle: '이미지5', contestDate: '2024-04-29' },
  { contestId: 7, contestImage: '', contestTitle: '이미지6', contestDate: '2024-04-29' },
  { contestId: 8, contestImage: '', contestTitle: '이미지7', contestDate: '2024-04-29' },
]

const CompetitionSearch = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useRecoilState<Search>(searchState)
  const [progressCompetitionList, setProgressCompetitionList] = useState<ContestData[]>([
    {
      contestId: 0,
      contestTitle: '',
      contestImage: '',
      contestDate: '',
    },
  ])
  const [finishCompetitionList, setFinishCompetitionList] = useState<ContestData[]>([
    {
      contestId: 0,
      contestTitle: '',
      contestImage: '',
      contestDate: '',
    },
  ])

  useEffect(() => {
    /* GET `api/contest?keyword=${search.keyword}&category=${search.category}&isEnd=false&page=0&size=12&orderBys=${search.orderBy}` */
    setProgressCompetitionList(data)
    /* GET `api/contest?keyword=${search.keyword}&category=${search.category}&isEnd=true&page=0&size=12&orderBy=${search.orderBy}` */
    setFinishCompetitionList(data)
  }, [])

  const handleMore = (key: string) => {
    // pageable 다음 페이지가 있는지 확인 절차 추가
    if (key === 'progress') {
      /* GET `api/contest?keyword=${search.keyword}&category=${search.category}&isEnd=false&page=0&size=12&orderBys=${search.orderBy}` */
      setProgressCompetitionList((prevList) => [...prevList, ...data])
    } else if (key === 'finish') {
      /* GET `api/contest?keyword=${search.keyword}&category=${search.category}&isEnd=true&page=0&size=12&orderBy=${search.orderBy}` */
      setFinishCompetitionList((prevList) => [...prevList, ...data])
    }
  }

  const handleSearch = async (searchQuery: string | undefined) => {
    console.log('데이터 검색')
    setSearch((prev) => ({ ...prev, keyword: searchQuery }))
  }

  useEffect(() => {
    if (search.category != 0 || search.keyword !== '') {
      navigate(
        `/competition/search?${search.keyword != '' ? `key=${search.keyword}&` : ''}${search.category != 0 ? `category=${search.category}&` : ''}&orderBy=${search.orderBy}`,
      )
    }
  }, [search])

  return (
    <div>
      <Navbar />
      <div className={styles.search}>
        <div className={styles.search_container}>
          <SearchBar text="원하는 대회를 입력해주세요." openBtn openBtnColor="mainColor" onClick={handleSearch} />
          <CompetitionCategory />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.progress_list}>
          <CompetitionSearchList title="진행 중인 대회" data={progressCompetitionList} />
          <div className={styles.more_btn}>
            <Button variation={'purple'} onClick={() => handleMore('progress')}>
              {'더보기'}
            </Button>
          </div>
          <CompetitionSearchList title="마감된 대회" data={finishCompetitionList} />
          <div className={styles.more_btn}>
            <Button variation={'purple'} onClick={() => handleMore('finish')}>
              {'더보기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetitionSearch
