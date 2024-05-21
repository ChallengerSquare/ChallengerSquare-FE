import { useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import styles from '@/pages/home/Home.module.scss'
import HomeSectionOne from './SectionOne/HomeSectionOne'
import HomeSectionTwo from './SectionTwo/HomeSectionTwo'
import HomeSectionThree from './SectionThree/HomeSectionThree'
import HomeSectionFour from './SectionFour/HomeSectionFour'
import HomeSectionFive from './SectionFive/HomeSectionFive'

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
        <div className={styles.section5}>
          <HomeSectionFive />
        </div>
      </div>
    </div>
  )
}
export default Home
