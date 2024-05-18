import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Page, SearchRequest, SearchResponse } from '@/types/api'
import { ContestData } from '@/types/competition'
import { getCompetitionList } from '@/services/competition'
import styles from '@/pages/competition-search/CompetitionSearch.module.scss'
import Footer from '@/components/Footer/Footer'
import CompetitionCategory from '@/components/Competition/CompetitionCategory'
import SearchBar from '@/components/SearchBar/SearchBar'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionSearchList from '@/components/Competition/CompetitionSearchList'
import Button from '@/components/Button/Button'

const CompetitionSearch = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const keywordFromUrl = searchParams.get('keyword') || ''
  const categoryFromUrl = searchParams.get('category') || ''
  const [searchKeyword, setSearchKeyword] = useState<string>(keywordFromUrl)
  const [searchCategory, setSearchCategory] = useState(0)
  const [progressOrderBy, setProgressOrderBy] = useState(3)
  const [finishOrderBy, setFinishOrderBy] = useState(3)
  const [progressPage, setProgressPage] = useState<Page>({
    currentPage: 0,
    totalPage: 0,
  })
  const [finishPage, setFinishPage] = useState<Page>({
    currentPage: 0,
    totalPage: 0,
  })
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
    setSearchKeyword(keywordFromUrl)
    if (categoryFromUrl) setSearchCategory(parseInt(categoryFromUrl, 10))
  }, [location.search])

  useEffect(() => {
    const progressCompetitionListParams: SearchRequest = {
      orderBy: progressOrderBy,
      keyword: searchKeyword === '' ? null : searchKeyword,
      category: searchCategory === 0 ? null : searchCategory,
      isEnd: false,
      page: 0,
      size: 8,
    }
    getProgressCompetitionListData(progressCompetitionListParams, true)
    const finishCompetitionListParams: SearchRequest = {
      orderBy: finishOrderBy,
      keyword: searchKeyword === '' ? null : searchKeyword,
      category: searchCategory === 0 ? null : searchCategory,
      isEnd: true,
      page: 0,
      size: 8,
    }
    getFinishCompetitionListData(finishCompetitionListParams, true)
  }, [searchKeyword, searchCategory, progressOrderBy, finishOrderBy])

  const getProgressCompetitionListData = (param: SearchRequest, clear: boolean) => {
    getCompetitionList(param).then(({ data }) => {
      const progressCompetitionListData: ContestData[] = data.content.map((item: SearchResponse) => ({
        contestId: item.contestId,
        contestTitle: item.contestTitle,
        contestImage: `${item.contestImage === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null' ? '' : item.contestImage}`,
        contestDate: `${item.contestPeriod.start} ~ ${item.contestPeriod.end}`,
      }))
      setProgressPage({ currentPage: data.pageable.pageNumber, totalPage: data.totalPages })
      if (clear) {
        setProgressCompetitionList(progressCompetitionListData)
      } else {
        setProgressCompetitionList((prev) => [...prev, ...progressCompetitionListData])
      }
    })
  }

  const getFinishCompetitionListData = (param: SearchRequest, clear: boolean) => {
    getCompetitionList(param).then(({ data }) => {
      const finishCompetitionListData: ContestData[] = data.content.map((item: SearchResponse) => ({
        contestId: item.contestId,
        contestTitle: item.contestTitle,
        contestImage: `${item.contestImage === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null' ? '' : item.contestImage}`,
        contestDate: `${item.contestPeriod.start} ~ ${item.contestPeriod.end}`,
      }))
      setFinishPage({ currentPage: data.pageable.pageNumber, totalPage: data.totalPages })
      if (clear) {
        setFinishCompetitionList(finishCompetitionListData)
      } else {
        setFinishCompetitionList((prev) => [...prev, ...finishCompetitionListData])
      }
    })
  }

  const handleMore = (key: string) => {
    if (key === 'progress') {
      console.log(progressOrderBy)
      const progressCompetitionListParams: SearchRequest = {
        orderBy: progressOrderBy,
        keyword: searchKeyword,
        category: searchCategory === 0 ? null : searchCategory,
        isEnd: false,
        page: progressPage.currentPage + 1,
        size: 8,
      }
      getProgressCompetitionListData(progressCompetitionListParams, false)
    } else if (key === 'finish') {
      const finishCompetitionListParams: SearchRequest = {
        orderBy: finishOrderBy,
        keyword: searchKeyword,
        category: searchCategory === 0 ? null : searchCategory,
        isEnd: true,
        page: finishPage.currentPage + 1,
        size: 8,
      }
      getFinishCompetitionListData(finishCompetitionListParams, false)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams()
    if (keywordFromUrl) {
      searchParams.append('keyword', keywordFromUrl)
    }
    if (searchCategory && searchCategory.toString() != categoryFromUrl) {
      searchParams.append('category', searchCategory.toString())
    }
    navigate(`?${searchParams.toString()}`)
  }, [searchCategory])

  return (
    <div>
      <Navbar />
      <div className={styles.search}>
        <div className={styles.search_container}>
          <SearchBar text="원하는 대회를 입력해주세요." openBtn openBtnColor="mainColor" url={''} />
          <CompetitionCategory category={searchCategory} setCategory={setSearchCategory} />
        </div>
      </div>
      <div className={styles.list_container}>
        <div className={styles.list}>
          <div className={styles.item}>
            <CompetitionSearchList
              title="진행 중인 대회"
              data={progressCompetitionList}
              orderBy={progressOrderBy}
              setOrderBy={setProgressOrderBy}
            />
            {progressPage.currentPage + 1 < progressPage.totalPage ? (
              <div className={styles.more_btn}>
                <Button variation={'deep_purple'} width={100} onClick={() => handleMore('progress')}>
                  {'더보기'}
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <CompetitionSearchList
              title="마감된 대회"
              data={finishCompetitionList}
              orderBy={finishOrderBy}
              setOrderBy={setFinishOrderBy}
            />
            {finishPage.currentPage + 1 < finishPage.totalPage ? (
              <div className={styles.more_btn}>
                <Button variation={'deep_purple'} width={100} onClick={() => handleMore('finish')}>
                  {'더보기'}
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CompetitionSearch
