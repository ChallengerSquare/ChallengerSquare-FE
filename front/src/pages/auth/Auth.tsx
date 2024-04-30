import styles from './Auth.module.scss'

const Auth = () => {
  const challSv2 = `${process.env.PUBLIC_URL}/svgs/challSv2.svg`
  const content = `${process.env.PUBLIC_URL}/images/auth/content.png`
  const kakaoBtn = `${process.env.PUBLIC_URL}/images/auth/kakao_login.png`
  const googleBtn = `${process.env.PUBLIC_URL}/images/auth/google_login.png`

  const kakaoUrl = 'https://www.challengersquare.com/api/oauth2/authorization/kakao'
  const googleUrl = 'https://www.challengersquare.com/api/oauth2/authorization/google'

  const KakaoLoginHandler = () => {
    window.location.href = kakaoUrl
  }

  const GoogleLoginHandler = () => {
    window.location.href = googleUrl
  }

  return (
    <>
      <div className="grid grid-flow-col h-screen">
        <div className={styles.background} />

        <div className={styles.container}>
          <div className={styles.wrap}>
            <div>
              <img src={challSv2} alt="renewal" />
            </div>

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
    </>
  )
}

export default Auth
