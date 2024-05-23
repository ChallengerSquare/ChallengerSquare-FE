import styles from '@/components/Competition/CompetitionCategory.module.scss'
import All from '@assets/svgs/category/all.svg'
import IT from '@assets/svgs/category/it.svg'
import Art from '@assets/svgs/category/art.svg'
import Idea from '@assets/svgs/category/idea.svg'
import Sport from '@assets/svgs/category/sport.svg'
import Game from '@assets/svgs/category/game.svg'
import More from '@assets/svgs/category/more.svg'
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
      {iconsData.map((icon) => (
        <div key={icon.id} className={styles.icon}>
          <button
            type="button"
            className={`${styles.btn} ${category === icon.id ? styles.active : ''}`}
            onClick={() => setCategory(icon.id)}
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
