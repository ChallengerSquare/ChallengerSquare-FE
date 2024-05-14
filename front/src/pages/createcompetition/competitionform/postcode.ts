const postcode = (callback: (fullAddress: string) => void) => {
  const script = document.createElement('script')
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  document.body.appendChild(script)

  script.onload = () => {
    window.daum.postcode.load(() => {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          let fullAddress = data.address
          let detailAddress = ''

          if (data.addressType === 'R') {
            if (data.bname !== '') {
              detailAddress += data.bname
            }
            if (data.buildingName !== '') {
              detailAddress += detailAddress !== '' ? `, ${data.buildingName}` : data.buildingName
            }
            fullAddress += detailAddress !== '' ? ` (${detailAddress})` : ''
          }

          // 콜백 함수 호출
          callback(fullAddress)
        },
      }).open()
    })
  }
}

export default postcode
