import React, { useState } from 'react'
import style from '@/components/Search/SearachList.module.scss'
import navigateBefore from '@/assets/navigate_before.svg'
import navigateNext from '@/assets/navigate_next.svg'
import backImg from '../../../public/images/competition/background.png'

interface Item {
  id: string
  image: string
  name: string
  date: string
}
interface Props {
  items: Item[]
  text: string
}

const SearchList = ({ text, items }: Props) => {
  const itemPerPage = 4
  const [currentIndex, setCurrentIndex] = useState(0)
  const [length] = useState(items.length)
  const [nextBtn, setNextBtn] = useState('next')

  // 슬라이드를 다음으로 이동
  const nextSlide = () => {
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

  const movetoCompetitionList = () => {}

  // 슬라이스된 아이템을 보여주는 렌더링 부분
  const slicedItems = items.slice(currentIndex, currentIndex + itemPerPage).map((item) => (
    <div className={style.content_item} key={item.id}>
      <img src={backImg} alt="competImg" />
      <p>{item.date}</p>
      <span>{item.name}</span>
    </div>
  ))

  return (
    <div className={style.container}>
      <div className={style.title}>
        <p>{text}</p>
      </div>
      <div className={style.content_wrap}>
        <div className={style.btn}>
          {currentIndex >= length - itemPerPage ? (
            <button className={style.leftBtn} type="button" onClick={prevSlide}>
              <img src={navigateBefore} alt="검색" />
            </button>
          ) : (
            <button type="button" disabled={currentIndex <= 0}>
              {null}
            </button>
          )}
        </div>
        <div className={style.content}>
          <div className={style.more}>
            <button type="button" onClick={movetoCompetitionList}>
              더보기
            </button>
          </div>
          <div className={style.content_items}>{slicedItems}</div>
        </div>
        <div className={style.btn}>
          {currentIndex <= 0 ? (
            <button className={style.rightBtn} type="button" onClick={nextSlide}>
              <img src={navigateNext} alt="검색" />
            </button>
          ) : (
            <button type="button" disabled={currentIndex >= length - itemPerPage}>
              {null}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchList