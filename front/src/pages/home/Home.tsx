import { useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import styles from '@/pages/home/Home.module.scss'
import HomeSectionOne from './home-section1/HomeSectionOne'
import HomeSectionTwo from './home-section2/HomeSectionTwo'
import HomeSectionThree from './home-section3/HomeSectionThree'
import HomeSectionFour from './home-section4/HomeSectionFour'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScroll = (e: WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY
        const scrollAmount = Math.sign(delta) * window.innerHeight
        container.scrollBy({ top: scrollAmount, left: 0, behavior: 'smooth' })
      }

      container.addEventListener('wheel', handleScroll)
    }
  }, [])

  return (
    <div>
      <div className={styles.container} ref={containerRef}>
        <Navbar enableScrollEffect />
        <div className={styles.section1}>
          <HomeSectionOne />
        </div>
        <div className={styles.section2}>
          <HomeSectionTwo />
        </div>
        <div className={styles.section3}>
          <HomeSectionThree />
        </div>
        <div className={styles.section4}>
          <HomeSectionFour />
        </div>
      </div>
    </div>
  )
}
export default Home
