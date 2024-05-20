import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContestData } from '@/types/competition'
import navigateBefore from '@/assets/svgs/navigate_before.svg'
import navigateNext from '@/assets/svgs/navigate_next.svg'
import styles from '@/components/Competition/CompetitionList.module.scss'
import ProfileImg from '../ProfileImg/ProfileImg'
import BaseImg from '../BaseImg/BaseImg'
import EmptyImg from '../EmptyImg/EmptyImg'

interface CompetitoinListProps {
  text: string
  contestList: ContestData[]
}

const itemPerPage = 4

const CompetitoinList = ({ text, contestList }: CompetitoinListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(0)

  useEffect(() => {
    setLength(contestList.length)
  }, [contestList])

  // 슬라이드를 다음으로 이동
  const nextSlide = () => {
    console.log(currentIndex)
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + itemPerPage)
    }
  }

  // 슬라이드를 이전으로 이동
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - itemPerPage)
    }
  }

  // 슬라이스된 아이템을 보여주는 렌더링 부분
  const slicedItems = contestList.slice(currentIndex, currentIndex + itemPerPage).map((item, index) => (
    <div className={styles.content_item} key={index}>
      <Link to={`/competition/detail/${item.contestId}`}>
        <div className={styles.poster}>
          <BaseImg imgUrl={item.contestImage} imgName={'대회이미지'} />
        </div>
        <p>{item.contestDate}</p>
        <span>{item.contestTitle}</span>
      </Link>
    </div>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{text}</p>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.btn}>
          <button className={styles.left_btn} type="button" onClick={prevSlide} disabled={currentIndex <= 0}>
            {currentIndex > 0 ? <img src={navigateBefore} alt="이전" /> : null}
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.more}>
            <Link to="/competition/search">{' + 더보기 '}</Link>
          </div>
          {contestList.length > 0 ? (
            <div className={styles.content_items}>{slicedItems}</div>
          ) : (
            <EmptyImg text={'해당 대회가 없습니다.'} />
          )}
        </div>
        <div className={styles.btn}>
          <button
            className={styles.right_btn}
            type="button"
            onClick={nextSlide}
            disabled={currentIndex >= length - itemPerPage}
          >
            {currentIndex < length - itemPerPage ? <img src={navigateNext} alt="다음" /> : null}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompetitoinList
