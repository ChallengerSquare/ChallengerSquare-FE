import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import styles from '@/components/Search/SearachBar.module.scss'
import searchIcon from '@/assets/search.svg'

interface SearchBarProps {
  text: string
  openBtn: boolean
  openBtnColor: string
}

const SearchBar = ({ text, openBtn, openBtnColor }: SearchBarProps) => {
  // const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const moveToComtetitionOpen = () => {
    // navigate(`/competition/create`)
  }

  const handleSearch = async (searchQuery: string) => {
    // navigate(`/competition/search?keyword=${searchQuery}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // 'Enter' 키를 눌렀을 때만 검색 실행
      handleSearch(keyword)
    }
  }

  let checkColor = ''
  if (openBtnColor === 'white') checkColor = styles.white
  else checkColor = styles.mainColor

  return (
    <div className={styles.search}>
      <div className={styles.search_bar}>
        <input
          type="text"
          placeholder={text}
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={25}
        />
        <button type="button" onClick={() => handleSearch(keyword)}>
          <img src={searchIcon} alt="검색" />
        </button>
      </div>
      {openBtn == true ? (
        <div className={styles.page_link}>
          <button className={checkColor} type="button" onClick={() => moveToComtetitionOpen()}>
            {`대회 개최하러가기 >`}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
