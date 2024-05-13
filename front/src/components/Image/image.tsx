import baseImg from '@images/baseImg.png'
import camera from '@svgs/camera.svg'
import styles from '@/components/Image/image.module.scss'

interface ImgProps {
  imgUrl: string
  imgName: string
  name: string
  edit?: boolean
}

const Image = ({ imgUrl, imgName, name, edit }: ImgProps) => {
  const className = `${styles[name]}`
  return (
    <div className={styles.img}>
      <img src={imgUrl === '' ? baseImg : imgUrl} alt={imgName} className={className} />
      {edit ? (
        <button type={'button'} className={styles.edit}>
          <img src={camera} alt={'사진편집'} />
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Image
