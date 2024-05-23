import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { notificationState } from '@/stores/notificationState'

const EventStreamManager = () => {
  const setNotification = useSetRecoilState(notificationState)

  useEffect(() => {
    const options = {
      withCredentials: true,
    }
    const eventSource = new EventSource(`${process.env.REACT_APP_API_ROOT}/sse/subscribe`, options)

    eventSource.addEventListener('sse', (event) => {
      const data = JSON.parse(event.data)
      if (data.unRead || data.unread) {
        setNotification(true)
      }
    })

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [setNotification])

  return null
}

export default EventStreamManager
