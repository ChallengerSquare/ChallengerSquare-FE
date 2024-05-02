import React, { useState } from 'react'
import SearchBar from '@/components/Search/SearchBar'
import styles from '@/components/Search/Search.module.scss'

const Search = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>
          행사 개최, 관리, 참여를 모두 <span>한 곳</span>에서.
        </p>
        <p>
          수상 내역, 참가 확인은 <span>블록체인</span>으로 안전하고 확실하게.
        </p>
      </div>
      <SearchBar text="원하는 대회를 입력해주세요" openBtn />
    </div>
  )
}

export default Search
