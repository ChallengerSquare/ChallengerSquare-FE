declare global {
  interface Window {
    daum?: any // 지도 모듈
    IMP?: any // 결제 모듈
  }
}

const handleComplete = (
  data: any,
  setAddress: React.Dispatch<React.SetStateAction<{ postcode: string; roadAddress: string; detailAddress: string }>>,
) => {
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

  // 상태 업데이트
  setAddress({
    postcode: data.zonecode,
    roadAddress: fullAddress,
    detailAddress,
  })
}

export const loadPostcode = (
  setAddress: React.Dispatch<
    React.SetStateAction<{
      postcode: string
      roadAddress: string
      detailAddress: string
    }>
  >,
) => {
  const script = document.createElement('script')
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  document.body.appendChild(script)

  script.onload = () => {
    window.daum.postcode.load(() => {
      new window.daum.Postcode({
        oncomplete: (data: any) => handleComplete(data, setAddress),
      }).open()
    })
  }
}

export default loadPostcode
