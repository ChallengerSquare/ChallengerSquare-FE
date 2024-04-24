import React from 'react'

const Navbar = () => {
  // 로고의 경로를 설정합니다. 이 경로는 public 폴더를 기준으로 합니다.
  const logoPath = `${process.env.PUBLIC_URL}/svgs/NavLogo.svg`

  return (
    <header className="bg-white shadow-md py-4 px-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center text-xl font-bold">
          {/* 이미지 태그를 사용하여 로고를 삽입합니다. */}
          <img src={logoPath} alt="Challenger Square" className="h-8 mr-3" />
        </div>
        <nav>
          <a href="www.naver.com" className="text-base mx-2 hover:text-indigo-600 transition-colors">
            대회
          </a>
          <a href="www.naver.com" className="text-base mx-2 hover:text-indigo-600 transition-colors">
            수상/참가 내역 조회
          </a>
        </nav>
        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors"
        >
          로그인
        </button>
      </div>
    </header>
  )
}

export default Navbar
