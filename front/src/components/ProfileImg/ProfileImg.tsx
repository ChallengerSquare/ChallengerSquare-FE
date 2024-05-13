import styles from '@/components/ProfileImg/ProfileImg.module.scss'
import baseImg from '@images/baseImg.png'
import camera from '@svgs/camera.svg'
import { useRef } from 'react'

interface ImgProps {
  imgUrl: string
  imgName: string
  name: string
  edit?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileImg = ({ imgUrl, imgName, name, edit, onChange }: ImgProps) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const handleImageUpload = () => {
    fileInput.current?.click()
  }
  const className = `${styles[name]}`
  return (
    <div className={styles.img}>
      <img src={imgUrl === '' ? baseImg : imgUrl} alt={imgName} className={className} />
      {edit ? (
        <button type={'button'} className={styles.edit}>
          <img src={camera} alt={'사진편집'} onClick={handleImageUpload} />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            ref={fileInput}
            onChange={onChange}
          />
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default ProfileImg
