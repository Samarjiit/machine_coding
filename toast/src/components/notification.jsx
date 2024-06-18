import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai"
import "./notification.css"

const iconStyles = { marginRight: "10px" }
const icons = {
  success: <AiOutlineCheck style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
}

const animations = { fade: "fadeIn", pop: "popup", slide: "slideIn" }

const Notification = ({
  type = "info",
  message,
  onClose = () => {},
  animation = "slide",
}) => {
  return (
    <div className={`notification ${type} ${animations[animation]}`}>
      {icons[type]} {message}
      <AiOutlineClose
        className="closeBtn"
        color="white"
        onClick={() => onClose()}
      />
    </div>
  )
}

export default Notification
