import { useState, useEffect } from 'react'
import styles from '@/pages/mypage/alarm/Alarm.module.scss'
import notificationsIcon from '@svgs/alarm/notifications.svg'
import EmptyImg from '@/components/EmptyImg/EmptyImg'
import { getAlarmList, readAlarm } from '@services/alarm'
import { useSetRecoilState } from 'recoil'
import { notificationState } from '@/stores/notificationState'

interface alarmData {
  alertId: number
  alertType: string
  alertContent: string
  isRead: boolean
  alertTargetId: number
}

const Alarm = () => {
  const setNotification = useSetRecoilState(notificationState)
  const [alramList, setAlarmList] = useState<alarmData[]>([])
  const [unread, setUnread] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getAlarmList().then(({ data }) => {
      setAlarmList(data)
      const unreadCount = data.filter((alarm: alarmData) => !alarm.isRead).length
      setUnread(unreadCount)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (unread === 0) {
      setNotification(false)
    }
  }, [unread])

  const handleAlarm = (idx: number) => {
    readAlarm(alramList[idx].alertId)
    const updatedAlarms = [...alramList]
    updatedAlarms[idx] = { ...updatedAlarms[idx], isRead: true }
    setAlarmList(updatedAlarms)
    if (unread !== null && unread > 0) {
      const newUnread = unread - 1
      setUnread(newUnread)
      if (newUnread === 0) {
        setNotification(false)
      }
    }
  }

  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <div>{'HOME > 알림'}</div>
      </div>
      {loading ? (
        ''
      ) : alramList.length > 0 ? (
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
                  <div className={styles.notice_content}>{alarm.alertContent}</div>
                </div>
              </div>
              <div className={styles.time}>
                <img src={notificationsIcon} alt={'notificationsIcon'} />
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
