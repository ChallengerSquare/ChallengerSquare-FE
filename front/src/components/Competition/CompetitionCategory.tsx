import styles from '@/components/Competition/CompetitionCategory.module.scss'
import SearchImg from '@/assets/search.svg'
import { useRecoilState } from 'recoil'
import { Search } from '@/types/search'
import { useEffect, useState } from 'react'
import { searchState } from '@/pages/competition-search/store'

const iconsData = [
  { id: 0, name: '전체', image: SearchImg },
  { id: 1, name: 'IT', image: SearchImg },
  { id: 2, name: '게임', image: SearchImg },
  { id: 3, name: '예술', image: SearchImg },
  { id: 4, name: '스포츠', image: SearchImg },
  { id: 5, name: '아이디어', image: SearchImg },
  { id: 6, name: '기타', image: SearchImg },
]

const CompetitionCategory = () => {
  const [search, setSearch] = useRecoilState(searchState)
  const [categoryId, setCategoryId] = useState<number | undefined>(0)

  const handleChangeCategoryId = (id: number) => {
    console.log(`API 호출: ${id}`)
    setCategoryId(id)
    setSearch((prev) => ({ ...prev, category: id }))
  }

  useEffect(() => {
    setCategoryId(search.category)
  }, [])

  return (
    <div className={styles.icons_container}>
      {iconsData.map((icon) => (
        <div key={icon.name} className={styles.icon}>
          <button
            type="button"
            className={categoryId === icon.id ? styles.active : styles.inactive}
            onClick={() => handleChangeCategoryId(icon.id)}
          >
            <img src={icon.image} alt={icon.name} />
          </button>
          <p>{icon.name}</p>
        </div>
      ))}
    </div>
  )
}

export default CompetitionCategory
