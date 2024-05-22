import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '@/components/SearchBar/SearachBar.module.scss'
import searchIcon from '@/assets/svgs/search/search.svg'

interface SearchBarProps {
  text: string
  url: string
  openBtn?: boolean
  openBtnColor?: string
}

const SearchBar = ({ text, openBtn, openBtnColor, url }: SearchBarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const keywordFromUrl = searchParams.get('keyword')
  const categoryFromUrl = searchParams.get('category') || ''
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (keywordFromUrl) {
      setSearch(keywordFromUrl)
    }
    console.log(location)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const moveToComtetitionOpen = () => {
    navigate(`/create-competition`)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleClick()
    }
  }

  const handleClick = () => {
    const params = new URLSearchParams()
    if (url === 'code') {
      navigate(`${url}/${search}`)
    } else {
      if (search && search != '') {
        params.append('keyword', search)
      }
      if (categoryFromUrl) {
        params.append('category', categoryFromUrl)
      }
      navigate(`${url}?${params.toString()}`)
    }
  }

  let checkColor = ''
  if (openBtnColor === 'white') checkColor = styles.white
  else checkColor = styles.mainColor

  return (
    <div className={styles.search}>
      <div className={styles.search_bar}>
        <input type="text" placeholder={text} value={search} onChange={handleChange} onKeyDown={handleKeyDown} />
        <button type="button" onClick={handleClick}>
          <img className={styles.searchimg} src={searchIcon} alt="검색" />
        </button>
      </div>
      {openBtn == true ? (
        <div className={styles.page_link}>
          <button className={checkColor} type="button" onClick={() => moveToComtetitionOpen()}>
            <p>{`대회 개최하러가기 >`}</p>
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default SearchBar
