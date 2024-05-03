import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '@/components/Competition/CompetitionSearchList.module.scss'
import img from '../../../public/images/competition/background.png'

interface SearchListProps {
  title: string
  data: item[]
}

interface item {
  id: number
  image: string
  name: string
  date: string
}

const CompetitionSearchList = ({ title, data }: SearchListProps) => {
  const [items, setItems] = useState([...data])
  const [sortOrder, setSortOrder] = useState('date')

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await fetch(`https://api.example.com/items?sort=${sortOrder}`)
      //   const data = await response.json()
      //   setItems(data)
    }
    fetchData()
  }, [sortOrder])

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value)
  }

  return (
    <div>
      <div className={styles.title}>
        <p>{title}</p>
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="date">최신 등록순</option>
          <option value="name">이름순</option>
        </select>
      </div>
      <div className={styles.content}>
        <div className={styles.grid}>
          {items.map((item: item) => (
            <div key={item.id} className={styles.grid_item}>
              <Link to={`/competition/detail/${item.id}`}>
                <img src={img} alt={item.name} />
                <p>{item.name}</p>
                <span>{item.date}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompetitionSearchList
