import { useState, useEffect } from 'react'
import styles from '@/pages/mypage/alarm/Alarm.module.scss'
import notificationsIcon from '@svgs/notifications.svg'
import { isReadable } from 'stream'
import EmptyImg from '@/components/EmptyImg/EmptyImg'

interface alarmData {
  alertId: number
  alertType: string
  alertContent: string
  isRead: boolean
  alertTargetId: number
}

const Alarm = () => {
  const [alramList, setAlarmList] = useState<alarmData[]>([
    {
      alertId: 0,
      alertType: '',
      alertContent: '',
      isRead: true,
      alertTargetId: 0,
    },
  ])

  useEffect(() => {
    /* 공지 API 호출 */
    setAlarmList([
      {
        alertId: 1,
        alertType: 'Notification',
        alertContent: 'You have a new message',
        isRead: false,
        alertTargetId: 123,
      },
      {
        alertId: 2,
        alertType: 'Reminder',
        alertContent: "Don't forget to complete your tasks",
        isRead: true,
        alertTargetId: 456,
      },
      {
        alertId: 3,
        alertType: 'Notification',
        alertContent: 'You have a meeting at 2 PM',
        isRead: false,
        alertTargetId: 789,
      },
      {
        alertId: 4,
        alertType: 'Notification',
        alertContent: 'Your payment was successful',
        isRead: true,
        alertTargetId: 101112,
      },
      {
        alertId: 5,
        alertType: 'Reminder',
        alertContent: 'Call mom on her birthday',
        isRead: false,
        alertTargetId: 131415,
      },
    ])
  }, [])

  const handleAlarm = (idx: number) => {
    /* alertId 조회 API 호출 */
    const updatedAlarms = [...alramList]
    updatedAlarms[idx] = { ...updatedAlarms[idx], isRead: true }
    console.log(alramList)
    setAlarmList(updatedAlarms)
  }

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'HOME > 알람'}</div>
      </div>
      {alramList.length > 0 ? (
        <div className={styles.content}>
          {alramList.map((alarm, index) => (
            <button
              key={alarm.alertId}
              type={'button'}
              className={`${styles.notification} ${alarm.isRead ? '' : styles.unread}`}
              disabled={alarm.isRead}
              onClick={() => handleAlarm(index)}
            >
              <div>
                <div className={styles.notice_title}>
                  <div className={`${styles.point} ${alarm.isRead ? '' : styles.unread}`}>{''}</div>
                  <div>{'SSAFY 자율 프로젝트'}</div>
                </div>
                <div className={styles.notice_content}>{alarm.alertContent}</div>
              </div>
              <div className={styles.time}>
                <img src={notificationsIcon} alt={'notificationsIcon'} />
                {'1시간 전'}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyImg text={'알림이 없습니다.'} />
        </div>
      )}
    </div>
  )
}

export default Alarm
