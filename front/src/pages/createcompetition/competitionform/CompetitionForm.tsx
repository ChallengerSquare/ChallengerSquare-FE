import { useState, useEffect, useRef } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { Category, categorys } from '@/types/category'
import { stepProps } from '@/types/step'
import Dropdown from '@/components/Dropdown/Dropdown'
import Button from '@/components/Button/Button'
import Calendar, { formatDate } from '@/components/Calendar/Calendar'
import ping from '@svgs/ping.svg'
import uploadIcon from '@svgs/uploadIcon.svg'
import postcode from './postcode'
import { competitionForm } from '../store'
import styles from './CompetitionForm.module.scss'
/* eslint-disable jsx-a11y/no-static-element-interactions */

const CompetitionForm = ({ prevStep, nextStep }: stepProps) => {
  const [formState, setFormState] = useRecoilState(competitionForm)
  const [selectedButton, setSelectedButton] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [startRecruitDate, setStartRecruitDate] = useState<Date | null>(null)
  const [endRecruitDate, setEndRecruitDate] = useState<Date | null>(null)
  const [isOffLine, setIsOffLine] = useState<boolean>(false)
  const [free, setFree] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [locationDetail, setLocationDetail] = useState<string>('')

  useEffect(() => {
    console.log('Updated Registration Period Start:', formState.contestCreateRequestDto.registrationPeriod.start)
  }, [formState.contestCreateRequestDto.registrationPeriod.start])
  useEffect(() => {
    console.log('Updated Contest Period Start:', formState.contestCreateRequestDto.registrationPeriod.start)
  }, [formState.contestCreateRequestDto.contestPeriod.start])

  useEffect(() => {
    if (formState.contestCreateRequestDto.contestLocation) {
      const parts = formState.contestCreateRequestDto.contestLocation.split('.')
      if (parts.length > 1) {
        setLocationDetail(parts[1].trim()) // 세부 주소를 상태에 설정
        handleInputChange('contestLocation', parts[0].trim()) // 기본 주소를 상태에 설정
      } else {
        handleInputChange('contestLocation', parts[0].trim()) // 세부 주소 없이 기본 주소만 있을 경우
      }
    }
  }, [formState.contestCreateRequestDto.contestLocation])

  const handleInputChange = (field: keyof typeof formState.contestCreateRequestDto, value: any) => {
    setFormState({
      ...formState,
      contestCreateRequestDto: {
        ...formState.contestCreateRequestDto,
        [field]: value,
      },
    })
  }
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const setContestPeriod = async (st: Date | null, en: Date | null) => {
    const fst = formatDate(st)
    const fen = formatDate(en)
    setFormState({
      ...formState,
      contestCreateRequestDto: {
        ...formState.contestCreateRequestDto,
        contestPeriod: {
          start: fst,
          end: fen,
        },
      },
    })
  }

  const setRegistrationPeriod = async (st: Date | null, en: Date | null) => {
    const fst = formatDate(st)
    const fen = formatDate(en)
    setFormState({
      ...formState,
      contestCreateRequestDto: {
        ...formState.contestCreateRequestDto,
        registrationPeriod: {
          start: fst,
          end: fen,
        },
      },
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && ev.target.result) {
          setFormState((prev) => ({
            ...prev,
            contestImage: ev.target?.result as string,
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }
  const updateLocation = () => {
    const fullLocation = `${formState.contestCreateRequestDto.contestLocation} . ${locationDetail}`.trim()
    handleInputChange('contestLocation', fullLocation)
  }
  const handlePrevStep = () => {
    setRegistrationPeriod(startRecruitDate, endRecruitDate)
    updateLocation()
    setContestPeriod(startDate, endDate)
    if (prevStep) prevStep()
  }
  const handleNextStep = () => {
    console.log(startRecruitDate)
    console.log(endRecruitDate)
    console.log(startDate)
    console.log(endDate)
    if (startRecruitDate && endRecruitDate && startDate && endDate && nextStep) {
      setRegistrationPeriod(startRecruitDate, endRecruitDate)
      setContestPeriod(startDate, endDate)

      if (
        formState.contestImage &&
        formState.contestCreateRequestDto.contestCategory &&
        formState.contestCreateRequestDto.contestTitle &&
        formState.contestCreateRequestDto.contestLocation &&
        formState.contestCreateRequestDto.contestRegistrationNum &&
        formState.contestCreateRequestDto.contestPeriod.end &&
        formState.contestCreateRequestDto.contestPhone
      ) {
        updateLocation()
        nextStep()
      } else {
        alert('전체 항목을 입력해주세요.')
      }
    } else {
      alert('날짜를 입력해주세요.')
    }
  }
  return (
    <>
      <div className={styles.header}>대회 정보를 입력해주세요.</div>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <div className={styles.poster}>포스터(썸네일)</div>
          <div className={styles.upload} onClick={handleUploadClick}>
            {formState.contestImage ? (
              <img src={formState.contestImage} alt="Uploaded Poster" />
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
              placeholder={
                formState.contestCreateRequestDto.contestCategory
                  ? categorys[parseInt(formState.contestCreateRequestDto.contestCategory, 10) - 1].category
                  : ''
              }
              onSelect={(category: Category) => {
                handleInputChange('contestCategory', category.index)
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
              value={formState.contestCreateRequestDto.contestTitle}
              onChange={(e) => handleInputChange('contestTitle', e.target.value)}
              placeholder="대회명을 입력하세요"
            />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 장소</div>
            <Button
              variation={`competition_place_online ${selectedButton === 'online' ? 'competition_btn_active' : ''}`}
              onClick={() => {
                setIsOffLine(false)
                setSelectedButton('online')
                handleInputChange('contestLocation', 'online')
              }}
            >
              온라인
            </Button>
            <div className="ml-5">
              <Button
                variation={`competition_place_offline ${selectedButton === 'offline' ? 'competition_btn_active' : ''}`}
                onClick={() => {
                  setIsOffLine(true)
                  setSelectedButton('offline')
                }}
              >
                오프라인
              </Button>
            </div>
            {isOffLine && (
              <div className="ml-4">
                <Button variation="regist_competition_btn" onClick={() => postcode(setFormState)}>
                  <img src={ping} alt="ping" className={styles.ping} />
                </Button>
              </div>
            )}
          </div>
          {isOffLine && (
            <div className={styles.place}>
              <input
                type="text"
                value={formState.contestCreateRequestDto.contestLocation}
                className={styles.place_box_one}
                onChange={(e) => {
                  handleInputChange('contestLocation', e.target.value)
                }}
                readOnly
              />
              <input
                type="text"
                className={styles.place_box_two}
                placeholder="(선택)"
                value={locationDetail}
                onChange={(e) => setLocationDetail(e.target.value)}
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
            <Calendar selectedDate={startDate} setSelectedDate={setStartDate} minDate={new Date()} />
            <div className={styles.period}>~</div>
            <Calendar selectedDate={endDate} setSelectedDate={setEndDate} minDate={startDate} />
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 인원(팀)</div>
            <input
              type="text"
              className={styles.input_box_two}
              value={formState.contestCreateRequestDto.contestRegistrationNum}
              onChange={(e) => handleInputChange('contestRegistrationNum', e.target.value)}
              placeholder="인원"
            />
            &nbsp; &nbsp;명(팀)
          </div>
          <div className={styles.element}>
            <div className={styles.label}>&nbsp; 참가비</div>
            <input
              type="text"
              className={styles.input_box_three}
              onChange={(e) => {
                //    const input = parseInt(e.target.value, 10)
                handleInputChange('contestFee', e.target.value)
                setFree(false)
              }}
              value={formState.contestCreateRequestDto.contestFee}
              placeholder="참가비"
            />
            &nbsp; &nbsp;원&nbsp;&nbsp;&nbsp;
            <Button
              variation={`competition_fee ${free ? 'competition_btn_active' : ''}`}
              onClick={() => {
                handleInputChange('contestFee', 0)
                setFree(!free)
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
              value={formState.contestCreateRequestDto.contestPhone}
              onChange={(e) => {
                handleInputChange('contestPhone', e.target.value)
              }}
              placeholder="000-0000-0000"
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Button variation="white default" onClick={handlePrevStep}>
            이전
          </Button>
        </div>
        <div>
          <Button variation="purple default" onClick={handleNextStep}>
            다음
          </Button>
        </div>
      </div>
    </>
  )
}

export default CompetitionForm
