import { useState } from 'react'

const useCheckBox = () => {
  const [isCheck, setIsCheck] = useState(false)

  const handleCheckBox = () => {
    setIsCheck(!isCheck)
  }

  return { isCheck, handleCheckBox, setIsCheck }
}

export default useCheckBox
