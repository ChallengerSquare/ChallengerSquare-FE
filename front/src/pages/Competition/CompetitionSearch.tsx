import styles from '@/pages/competition/CompetitionSearch.module.scss'
import CompetitionCategory from '@/components/Competition/CompetitionCategory'
import SearchBar from '@/components/Search/SearchBar'
import Navbar from '@/components/Navbar/Navbar'
import CompetitionSearchList from '@/components/Competition/CompetitionSearchList'

const data = [
  { id: 1, image: '이미지1', name: '이미지1', date: '2024-04-29' },
  { id: 2, image: '이미지2', name: '이미지2', date: '2024-04-29' },
  { id: 3, image: '이미지3', name: '이미지3', date: '2024-04-29' },
  { id: 4, image: '이미지4', name: '이미지4', date: '2024-04-29' },
  { id: 5, image: '이미지5', name: '이미지5', date: '2024-04-29' },
  { id: 6, image: '이미지6', name: '이미지5', date: '2024-04-29' },
  { id: 7, image: '이미지7', name: '이미지6', date: '2024-04-29' },
  { id: 8, image: '이미지8', name: '이미지7', date: '2024-04-29' },
  { id: 9, image: '이미지9', name: '이미지8', date: '2024-04-29' },
  { id: 10, image: '이미지10', name: '이미지9', date: '2024-04-29' },
  { id: 11, image: '이미지11', name: '이미지10', date: '2024-04-29' },
]

const CompetitionSearch = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.search}>
        <div className={styles.search_container}>
          <SearchBar text="원하는 대회를 입력해주세요." openBtn openBtnColor="mainColor" />
          <CompetitionCategory />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.progress_list}>
          <CompetitionSearchList title="진행 중인 대회" data={data} />
          <CompetitionSearchList title="마감된 대회" data={data} />
        </div>
      </div>
    </div>
  )
}

export default CompetitionSearch
