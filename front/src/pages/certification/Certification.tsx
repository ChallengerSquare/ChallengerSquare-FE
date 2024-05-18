import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { ApiResponse } from '@/types/api'
import { toPng } from 'html-to-image'
import Navbar from '@/components/Navbar/Navbar'
import certificate from '@/assets/images/certification.png'
import blockchain from '@images/blockchain.jpg'
import Footer from '@/components/Footer/Footer'
import useScrollTop from '@/hooks/useScrollTop'
import styles from './Certification.module.scss'

const Certification = () => {
  useScrollTop()
  const [name, setName] = useState('김재윤')
  const [date, setDate] = useState('2024-02-031')
  // const { data: response } = useQuery<ApiResponse>(
  //   ['getCertification', competitionId],
  //   () => getCompetitionDetails(competitionId!),
  //   {
  //     enabled: !!competitionId,
  //   },
  // )
  const handleDownload = async () => {
    const node = document.getElementById('certificate')
    if (node) {
      const dataUrl = await toPng(node)

      const link = document.createElement('a')
      link.download = 'certificate.png'
      link.href = dataUrl
      link.click()
    } else {
      console.error('Certificate element not found') // 에러 메시지를 출력합니다.
    }
  }
  return (
    <>
      <div className={styles.container}>
        <Navbar enableScrollEffect />
        <div className={styles.body}>
          <img className={styles.background} src={blockchain} alt={'background'} />
          <div className={styles.box}>
            <button type="button" className={styles.search}>
              &lt; 검색하러가기{' '}
            </button>
            <div className={styles.code}>검색 코드 : {name}</div>
            <div className={styles.certificate}>
              <img className={styles.image} src={certificate} alt={'certificate'} />
              <div className={styles.reward}> 최우수상 </div>
              <div className={styles.content}>THIS CERTIFICATE PRODULY PRESNT TO</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Certification
