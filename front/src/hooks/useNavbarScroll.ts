import { useEffect, useState } from 'react'

const useNavbarScroll = (enableScrollEffect: boolean) => {
  const state = enableScrollEffect === true ? 'transparent' : 'white'
  const [navbarColor, setNavbarColor] = useState(state)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 80) setNavbarColor('white')
      else setNavbarColor('transparent')
    }

    if (enableScrollEffect) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
    return () => {}
  }, [enableScrollEffect])

  return navbarColor
}

export default useNavbarScroll
