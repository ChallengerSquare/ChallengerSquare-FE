import styles from '@/components/Competition/CompetitionCategory.module.scss'
import All from '@svgs/category/all.svg'
import IT from '@svgs/category/it.svg'
import Art from '@svgs/category/art.svg'
import Idea from '@svgs/category/idea.svg'
import Sport from '@svgs/category/sport.svg'
import Game from '@svgs/category/game.svg'
import More from '@svgs/category/more.svg'
import { Dispatch, SetStateAction } from 'react'

const iconsData = [
  { id: 0, name: '전체', image: All },
  { id: 1, name: 'IT', image: IT },
  { id: 2, name: '게임', image: Game },
  { id: 3, name: '예술', image: Art },
  { id: 4, name: '스포츠', image: Sport },
  { id: 5, name: '아이디어', image: Idea },
  { id: 6, name: '기타', image: More },
]

interface CompetitionCategoryProps {
  category: number
  setCategory: Dispatch<SetStateAction<number>>
}

const CompetitionCategory = ({ category, setCategory }: CompetitionCategoryProps) => {
  return (
    <div className={styles.icons_container}>
      {iconsData.map((icon, index) => (
        <div key={index} className={styles.icon}>
          <button
            type="button"
            className={`${styles.btn} ${category === index ? styles.active : ''}`}
            onClick={() => setCategory(index)}
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
