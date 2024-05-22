import styles from '@/components/BaseImg/BaseImg.module.scss'
import baseImg from '@/assets/images/base-img/baseImg.png'
import { useEffect, useState } from 'react'

interface ImgProps {
  imgUrl: string
  imgName: string
  variation?: string
}

const BaseImg = ({ variation, imgUrl, imgName }: ImgProps) => {
  const [className, setClassName] = useState<string>('')

  useEffect(() => {
    if (variation) {
      setClassName(
        variation
          .split(' ')
          .map((v) => styles[v])
          .join(' '),
      )
    } else {
      const img = 'img'
      setClassName(styles[img])
    }
  }, [variation])

  return (
    <img
      src={
        imgUrl === '' || imgUrl === null || imgUrl === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null'
          ? baseImg
          : imgUrl
      }
      alt={imgName}
      className={className}
    />
  )
}

export default BaseImg
