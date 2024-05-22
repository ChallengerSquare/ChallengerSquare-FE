import { useRef } from 'react'
import styles from '@/components/ProfileImg/ProfileImg.module.scss'
import BaseImg from '@/components/BaseImg/BaseImg'
import camera from '@assets/svgs/edit/camera.svg'

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
    <div className={styles.profileimg}>
      <div className={className}>
        <BaseImg imgUrl={imgUrl} imgName={imgName} />
      </div>
      {edit ? (
        <button type={'button'} className={styles.edit} onClick={handleImageUpload}>
          <img src={camera} alt={'사진편집'} />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            // accept="image/jpg,impge/png,image/jpeg"
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
