import { useState } from 'react'

const useCheckButton = () => {
  const [check, setCheck] = useState(false)

  const handleCheck = () => {
    setCheck(!check)
  }

  return { check, handleCheck }
}

export default useCheckButton
