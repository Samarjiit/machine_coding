import useNotification from "./hooks/use-notification"
const App = () => {
  const { NotificationComponent, triggerNotification } =
    useNotification("top-right")
  return (
    <div className="App">
      Toast notification
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            message: "file sent successfully",
            duration: 3000,
          })
        }
      >
        Trigger Success
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            message: "file has error",
            duration: 3000,
          })
        }
      >
        Trigger Error
      </button>
      {NotificationComponent}
    </div>
  )
}

export default App
