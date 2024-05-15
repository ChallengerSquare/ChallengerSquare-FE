import { useState, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { Category, categorys } from '@/types/category'
import { stepProps } from '@/types/step'
import Dropdown from '@/components/Dropdown/Dropdown'
import Button from '@/components/Button/Button'
import Calendar, { formatDate } from '@/components/Calendar/Calendar'
import ping from '@svgs/ping.svg'
import uploadIcon from '@svgs/uploadIcon.svg'
import postcode from './postcode'
import { competitionForm, formButtonState } from '../store'
import styles from './CompetitionForm.module.scss'
/* eslint-disable jsx-a11y/no-static-element-interactions */

const CompetitionForm = ({ prevStep, nextStep }: stepProps) => {
  const [formState, setFormState] = useRecoilState(competitionForm)
  const [buttonState, setButtonState] = useRecoilState(formButtonState)
  const [postImage, setPostImage] = useState<string | null>(null)
  const [categoryBox, setCategoryBox] = useState<Category | null>(null)
  const [competitionName, setCompetitionName] = useState<string>('')
  const [isOffLine, setIsOffLine] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [locationDetail, setLocationDetail] = useState<string>('')

  const [startRecruitDate, setStartRecruitDate] = useState<Date | null>(null)
  const [endRecruitDate, setEndRecruitDate] = useState<Date | null>(null)
  const [startCompetitionDate, setStartCompetitionDate] = useState<Date | null>(null)
  const [endCompetitionDate, setEndCompetitionDate] = useState<Date | null>(null)

  const [capacity, setCapacity] = useState<string>('')
  const [fee, setFee] = useState<string>('')
  const [isFree, setIsFree] = useState<boolean>(true)
  const [contact, setContact] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { contestImage, contestCreateRequestDto } = formState
    const categoryIndex = parseInt(contestCreateRequestDto.contestCategory, 10) - 1
    setPostImage(contestImage)
    setCategoryBox(contestCreateRequestDto.contestCategory ? categorys[categoryIndex] : null)
    setCompetitionName(contestCreateRequestDto.contestTitle)
    setLocation(contestCreateRequestDto.contestLocation.split(' , ')[0])
    setLocationDetail(contestCreateRequestDto.contestLocation.split(' , ')[1] || '')
    setStartRecruitDate(
      contestCreateRequestDto.registrationPeriod.start
        ? new Date(contestCreateRequestDto.registrationPeriod.start)
        : null,
    )
    setEndRecruitDate(
      contestCreateRequestDto.registrationPeriod.end ? new Date(contestCreateRequestDto.registrationPeriod.end) : null,
    )

    setStartCompetitionDate(
      contestCreateRequestDto.contestPeriod.start ? new Date(contestCreateRequestDto.contestPeriod.start) : null,
    )

    setEndCompetitionDate(
      contestCreateRequestDto.contestPeriod.end ? new Date(contestCreateRequestDto.contestPeriod.end) : null,
    )
    setCapacity(contestCreateRequestDto.contestRegistrationNum.toString())
    setFee(contestCreateRequestDto.contestFee.toString())
    setContact(contestCreateRequestDto.contestPhone)
    setIsOffLine(buttonState.offLine)
    setIsFree(buttonState.free)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && ev.target.result) {
          setPostImage(ev.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSetData = (type: 'prev' | 'next', step?: () => void) => {
    const isValid = () => {
      return (
        postImage &&
        categoryBox &&
        competitionName &&
        isOffLine &&
        (isOffLine !== '2' || (isOffLine === '2' && location !== '')) && // OffLine이 '2'일 경우 location은 ','가 아니어야 함
        startRecruitDate &&
        endRecruitDate &&
        startCompetitionDate &&
        endCompetitionDate &&
        capacity &&
        fee &&
        contact
      )
    }
    const setData = () => {
      const fullLocation = isOffLine === '2' ? `${location} , ${locationDetail}`.trim() : ''
      const formattedStartRecruitDate = formatDate(startRecruitDate)
      const formattedEndRecruitDate = formatDate(endRecruitDate)
      const formattedStartCompetitionDate = formatDate(startCompetitionDate)
      const formattedEndCompetitionDate = formatDate(endCompetitionDate)
      setFormState({
        ...formState,
        contestImage: postImage || '',
        contestCreateRequestDto: {
          ...formState.contestCreateRequestDto,
          contestTitle: competitionName,
          contestLocation: fullLocation,
          registrationPeriod: {
            start: formattedStartRecruitDate,
            end: formattedEndRecruitDate,
          },
          contestPeriod: {
            start: formattedStartCompetitionDate,
            end: formattedEndCompetitionDate,
          },
          contestRegistrationNum: parseInt(capacity, 10),
          contestFee: parseInt(fee, 10),
          contestPhone: contact,
          contestCategory: categoryBox ? categoryBox.index : '',
        },
      })

      setButtonState({
        ...buttonState,
        offLine: isOffLine,
        free: isFree,
      })
    }

    if (type === 'prev') {
      setData()
      step?.()
    }
    if (type === 'next') {
      if (isValid()) {
        setData()
        step?.()
      } else alert('항목을 모두 입력해주세요.')
    }
  }

  return (
    <>
      <div className={styles.header}>대회 정보를 입력해주세요.</div>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <div className={styles.poster}>포스터(썸네일)</div>
          <div
            className={styles.upload}
            onClick={() => {
              fileInputRef.current?.click()
            }}
          >
            {postImage ? (
              <img src={postImage} alt="Uploaded Poster" />
            ) : (
              <img src={uploadIcon} alt="Unloaded Poster" className={styles.default} />
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 분류</div>
            <Dropdown<Category>
              options={categorys}
              placeholder={categoryBox?.category}
              onSelect={(category: Category) => {
                setCategoryBox(category)
              }}
              element={(item) => item.category}
              width="120px"
            />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 대회명</div>
            <input
              type="text"
              className={styles.input_box}
              value={competitionName}
              onChange={(item) => {
                setCompetitionName(item.target.value)
              }}
              placeholder="대회명을 입력하세요"
            />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 장소</div>
            <Button
              variation={`competition_place_online ${isOffLine === '1' ? 'competition_btn_active' : ''}`}
              onClick={() => {
                setIsOffLine('1')
              }}
            >
              온라인
            </Button>
            <div className="ml-5">
              <Button
                variation={`competition_place_offline ${isOffLine === '2' ? 'competition_btn_active' : ''}`}
                onClick={() => {
                  setIsOffLine('2')
                }}
              >
                오프라인
              </Button>
            </div>
            {isOffLine === '2' && (
              <div className="ml-4">
                <Button
                  variation="regist_competition_btn"
                  onClick={() => {
                    postcode((address) => {
                      setLocation(address)
                    })
                  }}
                >
                  <img src={ping} alt="ping" className={styles.ping} />
                </Button>
              </div>
            )}
          </div>
          {isOffLine === '2' && (
            <div className={styles.place}>
              <input
                type="text"
                value={location}
                className={styles.place_box_one}
                onChange={(item) => {
                  setLocation(item.target.value)
                }}
                readOnly
              />
              <input
                type="text"
                className={styles.place_box_two}
                placeholder="(선택)"
                value={locationDetail}
                onChange={(item) => setLocationDetail(item.target.value)}
              />
            </div>
          )}
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 모집 기간</div>
            <Calendar selectedDate={startRecruitDate} setSelectedDate={setStartRecruitDate} minDate={new Date()} />
            <div className={styles.period}>~</div>
            <Calendar selectedDate={endRecruitDate} setSelectedDate={setEndRecruitDate} minDate={startRecruitDate} />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 행사 기간</div>
            <Calendar
              selectedDate={startCompetitionDate}
              setSelectedDate={setStartCompetitionDate}
              minDate={new Date()}
            />
            <div className={styles.period}>~</div>
            <Calendar
              selectedDate={endCompetitionDate}
              setSelectedDate={setEndCompetitionDate}
              minDate={startCompetitionDate}
            />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 인원(팀)</div>
            <input
              type="text"
              className={styles.input_box_two}
              value={capacity}
              onChange={(item) => {
                setCapacity(item.target.value)
              }}
              placeholder="인원"
            />
            &nbsp; &nbsp;명(팀)
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 참가비</div>
            <input
              type="text"
              className={styles.input_box_three}
              value={fee}
              onChange={(item) => {
                setIsFree(false)
                setFee(item.target.value)
              }}
              placeholder="참가비"
            />
            &nbsp; &nbsp;원&nbsp;&nbsp;&nbsp;
            <Button
              variation={`competition_fee ${isFree ? 'competition_btn_active' : ''}`}
              onClick={() => {
                setFee('0')
                setIsFree(!isFree)
              }}
            >
              무료
            </Button>
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 연락처</div>
            <input
              type="text"
              className={styles.input_box_four}
              value={contact}
              onChange={(item) => {
                setContact(item.target.value)
              }}
              placeholder="000-0000-0000"
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={() => handleSetData('prev', prevStep)}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="purple default" onClick={() => handleSetData('next', nextStep)}>
            다음
          </Button>
        </div>
      </div>
    </>
  )
}

export default CompetitionForm
