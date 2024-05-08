import React, { useState, useEffect } from 'react'
import styles from './CompetitionDetailTeam.module.scss'

interface student {
  id: number
  name: string
}

const CompetitionDetailTeam = () => {
  const [dataList, setDataList] = useState([])

  const students: student[] = [
    { id: 1, name: '안준현' },
    { id: 2, name: '김재윤' },
    { id: 3, name: '이성목' },
    { id: 4, name: '강다솔' },
    { id: 5, name: '강태연' },
    { id: 6, name: '남혜미' },
    { id: 7, name: '안준현' },
    { id: 8, name: '김재윤' },
    { id: 9, name: '이성목' },
    { id: 10, name: '강다솔' },
  ]
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
      <div className={styles.team}>
        <div className={styles.logo}>
          <img
            src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-11-%EC%98%A4%EC%A0%84-12.29.48.png"
            alt="팀 로고"
          />
        </div>
        <div className={styles.teamInfo}>
          <div className={styles.teamName}>팀이름</div>
          <div className={styles.teamDescription}>
            삼성 SW 청년 아카데미 (멀티캠퍼스) 10기 A05팀 입니다. 잘 부탁드립니다. ^^
          </div>
        </div>
      </div>
      <div className={styles.member}>
        <div className={styles.title}>팀 인원</div>
        <div className={styles.person_list}>
          {students.map((student) => (
            <div key={student.id} className={styles.person}>
              <p>{student.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.competition}>
        <div className={styles.title}>개최대회</div>
        <div className={styles.item_list}>
          {students.map((student) => (
            <div key={student.id} className={styles.item}>
              <img
                src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-11-%EC%98%A4%EC%A0%84-12.29.48.png"
                alt="팀 로고"
              />
              <p>{student.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompetitionDetailTeam
