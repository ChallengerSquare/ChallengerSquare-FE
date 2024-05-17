import styles from '@/components/BaseImg/BaseImg.module.scss'
import baseImg from '@images/baseImg.png'

interface ImgProps {
  imgUrl: string
  imgName: string
}

const BaseImg = ({ imgUrl, imgName }: ImgProps) => {
  return (
    <img
      src={
        imgUrl === '' || imgUrl === null || imgUrl === 'https://challengersquare.s3.ap-northeast-2.amazonaws.com/null'
          ? baseImg
          : imgUrl
      }
      alt={imgName}
      className={styles.img}
    />
  )
}

export default BaseImg
