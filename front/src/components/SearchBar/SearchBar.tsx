import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/components/SearchBar/SearachBar.module.scss'
import searchIcon from '@/assets/search.svg'
import { useRecoilState } from 'recoil'
import { SearchRequest } from '@/types/api'
import { searchState } from '@/pages/competition-search/store'

interface SearchBarProps {
  text: string
  openBtn?: boolean
  openBtnColor?: string
  onClick: (searchQuery: string | undefined) => void
  onChange?: (keyword: string) => void
}

const SearchBar = ({ text, openBtn, openBtnColor, onClick }: SearchBarProps) => {
  const navigate = useNavigate()
  const [search, setSearch] = useRecoilState<SearchRequest>(searchState)
  const [keyword, setKeyword] = useState(search.keyword)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const moveToComtetitionOpen = () => {
    navigate(`/create-competition`)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && keyword) {
      // 'Enter' 키를 눌렀을 때만 검색 실행
      onClick(keyword)
    }
  }

  useEffect(() => {
    setKeyword(search.keyword)
  }, [search])

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
        <button type="button" onClick={() => onClick(keyword)}>
          <img className={styles.searchimg} src={searchIcon} alt="검색" />
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
