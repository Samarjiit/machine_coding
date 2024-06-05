import { useEffect, useState } from "react"
import { MAX, MIN } from "../constants"

const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value)

  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(MIN, value))) //take care of edge case no less than 0 and more than 100
    if (value >= MAX) {
      onComplete()
    }
  }, [value])
  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>
      <div
        role="progressbar" //used to add accessibility
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent.toFixed()}
        //style={{ width: `${percent}%` }} or below method for animation
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
      />
    </div>
  )
}

export default ProgressBar
