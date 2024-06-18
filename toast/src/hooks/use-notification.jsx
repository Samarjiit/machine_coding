import { useCallback, useState } from "react"
import Notification from "../components/notification"
//have to access all the features of react
const useNotification = (position = "top-right") => {
  const [notification, setNotification] = useState(null) //keep the tab of current notification

  let timer

  const triggerNotification = useCallback((notificationProps) => {
    clearTimeout(timer)
    setNotification(notificationProps)
    timer = setTimeout(() => {
      setNotification(null)
    }, notificationProps.duration)
  }, [])

  const NotificationComponent = notification ? (
    <div className={`${position}`}>
      <Notification {...notification} />
    </div>
  ) : null
  return { NotificationComponent, triggerNotification }
}

export default useNotification
