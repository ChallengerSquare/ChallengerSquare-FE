import React, { useState, useEffect } from 'react'
import styles from './CompetitionDetailInfo.module.scss'

const CompetitionDetailInfo = () => {
  const [data, setdata] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      //   const response = await fetch(`https://api.example.com/items?sort=${sortOrder}`)
      //   const data = await response.json()
      //   setItems(data)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      {data.length === 0 ? (
        <div className={styles.empty}>
          <p> 등록된 상세정보가 없습니다. </p>
        </div>
      ) : (
        <div className={styles.empty}> 상세정보 </div>
      )}
    </div>
  )
}

export default CompetitionDetailInfo
