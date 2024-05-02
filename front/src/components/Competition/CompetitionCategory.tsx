import styles from '@/components/Competition/CompetitionCategory.module.scss'
import Search from '@/assets/search.svg'

const iconsData = [
  { name: '전체', image: Search, apiEndpoint: '/api/all' },
  { name: 'IT', image: Search, apiEndpoint: '/api/it' },
  { name: '게임', image: Search, apiEndpoint: '/api/game' },
  { name: '예술', image: Search, apiEndpoint: '/api/movie' },
  { name: '스포츠', image: Search, apiEndpoint: '/api/sports' },
  { name: '아이디어', image: Search, apiEndpoint: '/api/media' },
  { name: '기타', image: Search, apiEndpoint: '/api/etc' },
]

const moveToCompetitionOpen = (apiEndpoint: string) => {
  console.log(`API 호출: ${apiEndpoint}`)
  // 실제 API 호출 로직은 여기에 구현}
}

const CompetitionCategory = () => {
  return (
    <div className={styles.icons_container}>
      {iconsData.map((icon) => (
        <div key={icon.name} className={styles.icon}>
          <button type="button" onClick={() => moveToCompetitionOpen(icon.apiEndpoint)}>
            <img src={icon.image} alt={icon.name} />
          </button>
          <p>{icon.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CompetitionCategory
