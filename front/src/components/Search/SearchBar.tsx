import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import style from '@/components/Search/SearachBar.module.scss'

const SearchBar = () => {
  // const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  const moveToComtetitionOpen = () => {
    // navigate(`/search/result?keyword=${searchQuery}`)
  }

  const handleSearch = async (searchQuery: string) => {
    // navigate(`/search/result?keyword=${searchQuery}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      // 'Enter' 키를 눌렀을 때만 검색 실행
      handleSearch(keyword)
    }
  }
  return (
    <div className={style.search}>
      <div className={style.search_bar}>
        <input
          type={`text`}
          placeholder={`원하는 대회를 입력해주세요`}
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={25}
        />
        <button type="button" onClick={() => handleSearch(keyword)}>
          검색
        </button>
      </div>
      <div className={style.page_link}>
        <button type="button" onClick={() => moveToComtetitionOpen()}>
          {`대회 개최하러가기 >`}
        </button>
      </div>
    </div>
  )
}

export default SearchBar
