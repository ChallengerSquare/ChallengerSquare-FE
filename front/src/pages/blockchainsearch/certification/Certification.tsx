import { useEffect, useState } from 'react'
import { toPng } from 'html-to-image'
import { useNavigate, useParams } from 'react-router-dom'
import { getCertification } from '@/services/blockchain'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import Navbar from '@/components/Navbar/Navbar'
import Certificate from '@/assets/images/certification.png'
import blockchain from '@images/blockchain.jpg'
import LineIcon from '@svgs/line.svg'
import ShortLineIcon from '@svgs/shortline.svg'
import FileDownloadIcon from '@svgs/file_download.svg'
import Footer from '@/components/Footer/Footer'
import useScrollTop from '@/hooks/useScrollTop'
import styles from './Certification.module.scss'
// 115a9515-ab6a-4633-be6d-e7004452bb6f
// c973eb55-0b2d-4c71-9c58-876653a21585
interface Award {
  organizer: string
  event_name: string
  recipient_name: string
  recipient_code: string
  award_date: string
  award_type: string
  code: string
  type: 'award'
}

interface Participation {
  organizer: string
  event_name: string
  attendee_name: string
  attendee_code: string
  event_date: string
  code: string
  details: string
  type: 'participation'
}

type BlockchainCode = Award | Participation

const Certification = () => {
  useScrollTop()
  const { code } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('김재윤')
  const [date, setDate] = useState('2024-02-031')
  const [certificate, setCertificate] = useState<BlockchainCode | null>(null)
  useEffect(() => {
    if (code) {
      getCertification(code)
        .then((response) => {
          setCertificate(response.data as BlockchainCode)
        })
        .catch((error) => {})
    }
  }, [])
  const handleDownload = async () => {
    const node = document.getElementById('certificateContent')
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

  const certificateCode = () => {
    const shortCode = certificate?.code.split('-')[0]

    return (
      <>
        <div className={styles.signature}>BC_{shortCode}</div>
        <img src={ShortLineIcon} className={styles.line_signature} alt="line" />
        <div className={styles.signature_footer}>SIGNATURE</div>
      </>
    )
  }
  return (
    <>
      <div className={styles.container}>
        <Navbar enableScrollEffect />
        <div className={styles.body}>
          <img className={styles.background} src={blockchain} alt={'background'} />
          <div className={styles.box}>
            <button type="button" className={styles.search} onClick={() => navigate('/competition-results')}>
              &lt; 돌아가기
            </button>
            <div className={styles.code}>검색 결과 : {code}</div>
            {certificate ? (
              <>
                <div id="certificateContent" className={styles.certificate}>
                  <img className={styles.image} src={Certificate} alt={'certificate'} />
                  {
                    <div className={certificate.type === 'award' ? styles.event_name_award : styles.event_name}>
                      대회명 : <span style={{ fontWeight: 'bold' }}>{certificate.event_name}</span>
                    </div>
                  }
                  {certificate.type === 'award' ? <div className={styles.reward}> {certificate.award_type} </div> : ''}
                  <div className={styles.content}>THIS CERTIFICATE PRODULY PRESNT TO</div>
                  <div className={styles.name}>
                    {certificate.type === 'award' ? certificate.recipient_name : certificate.attendee_name}
                  </div>
                  <img src={LineIcon} className={styles.line_name} alt="line" />
                  <div className={styles.challengersquare}>CHALLENGER SQUARE</div>
                  {certificateCode()}
                  <div className={styles.date}>
                    {certificate.type === 'award' ? certificate.award_date : certificate.event_date}
                  </div>
                  <img src={ShortLineIcon} className={styles.line_date} alt="line" />
                  <div className={styles.date_footer}>DATE</div>
                  <div className={styles.organization}>{certificate.organizer}</div>
                  <img src={ShortLineIcon} className={styles.line_organization} alt="line" />
                  <div className={styles.organization_footer}>ORGANIZATION</div>
                </div>
              </>
            ) : (
              <EmptyImg text="검색 결과가 없습니다." />
            )}
            {certificate ? (
              <div className={styles.download}>
                <button type="button" className={styles.download_btn} onClick={handleDownload}>
                  <img src={FileDownloadIcon} alt="file_download" />
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Certification
