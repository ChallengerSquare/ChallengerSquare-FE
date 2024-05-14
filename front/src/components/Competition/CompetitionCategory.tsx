import styles from '@/components/Competition/CompetitionCategory.module.scss'
import All from '@svgs/category/all.svg'
import IT from '@svgs/category/it.svg'
import Art from '@svgs/category/art.svg'
import Idea from '@svgs/category/idea.svg'
import Sport from '@svgs/category/sport.svg'
import Game from '@svgs/category/game.svg'
import More from '@svgs/category/more.svg'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { searchState } from '@/pages/competition-search/store'

const iconsData = [
  { id: 0, name: '전체', image: All },
  { id: 1, name: 'IT', image: IT },
  { id: 2, name: '게임', image: Game },
  { id: 3, name: '예술', image: Art },
  { id: 4, name: '스포츠', image: Sport },
  { id: 5, name: '아이디어', image: Idea },
  { id: 6, name: '기타', image: More },
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
            className={`${styles.btn} ${categoryId === icon.id ? styles.active : ''}`}
            // className={categoryId === icon.id ? styles.active : styles.inactive}
            onClick={() => handleChangeCategoryId(icon.id)}
          >
            <img src={icon.image} alt={icon.name} />
            <p>{icon.name}</p>
          </button>
        </div>
      ))}
    </div>
  )
}

export default CompetitionCategory
