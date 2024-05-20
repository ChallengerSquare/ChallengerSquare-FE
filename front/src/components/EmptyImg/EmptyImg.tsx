import styles from '@/components/EmptyImg/EmptyImg.module.scss'
import emptyImg from '@images/empty.png'

interface EmptyImgProps {
  text: string
}

const EmptyImg = ({ text }: EmptyImgProps) => {
  return (
    <div className={styles.container}>
      <img src={emptyImg} alt={'비어있음'} />
      <p>{text}</p>
    </div>
  )
}

export default EmptyImg
