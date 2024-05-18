import styles from './Auth.module.scss'

const Auth = () => {
  const challSv2 = `${process.env.PUBLIC_URL}/svgs/logo/challSv2.svg`
  const content = `${process.env.PUBLIC_URL}/images/auth/content.png`
  const leftImage = `${process.env.PUBLIC_URL}/images/auth/bg-left.png`
  const kakaoBtn = `${process.env.PUBLIC_URL}/images/auth/kakao_login.png`
  const googleBtn = `${process.env.PUBLIC_URL}/images/auth/google_login.png`

  const kakaoUrl = `${process.env.REACT_APP_API_ROOT}/oauth2/authorization/kakao`
  const googleUrl = `${process.env.REACT_APP_API_ROOT}/oauth2/authorization/google`

  const KakaoLoginHandler = () => {
    window.location.href = kakaoUrl
  }

  const GoogleLoginHandler = () => {
    window.location.href = googleUrl
  }

  const handleClick = () => {
    window.location.href = '/'
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src={leftImage} alt="Renewal" />
        </div>

        <div className={styles.form}>
          <div className={styles.wrap}>
            <div className={styles.form_size}>
              <button type={'button'} onClick={handleClick}>
                <img src={challSv2} alt="Renewal" />
              </button>
              <div>
                <img src={content} alt="Content" />
              </div>
              <div className="mt-5">
                <button type="button" onClick={GoogleLoginHandler}>
                  <img src={googleBtn} alt="google" className={styles.btn} />
                </button>
              </div>

              <div className="mt-5">
                <button type="button" onClick={KakaoLoginHandler}>
                  <img src={kakaoBtn} alt="kakao" className={styles.btn} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
