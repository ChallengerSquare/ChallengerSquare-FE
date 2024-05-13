const postcode = (setFormState: (updateFn: (prevState: any) => any) => void) => {
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

          // Recoil 상태 업데이트
          setFormState((prevState) => ({
            ...prevState,
            contestCreateRequestDto: {
              ...prevState.contestCreateRequestDto,
              contestLocation: fullAddress,
            },
          }))
        },
      }).open()
    })
  }
}

export default postcode
