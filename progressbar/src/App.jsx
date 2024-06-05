import { useState } from "react"
import "./App.css"
import ProgressBar from "./components/ProgressBar"
import { useEffect } from "react"

const App = () => {
  const [value, setValue] = useState(0)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setInterval(() => {
      //setValue(value + 1) this will run at end of our function so it doesn't have the current context of the value
      //so werite the below code to get the context of the value
      setValue((val) => val + 1) //from callback we can take the very current value and add 1 to it
    }, 100) //run after fix interval of time
  }, [])
  return (
    <div className="app">
      <span>Progress Bar</span>
      <ProgressBar
        value={value}
        //adding scalable feature : means provide bunch of things outside the progressbar like onstart , oncomplete ,custom class and style so that we can fully control the component from outside  here like we reach the end than do something
        onComplete={() => {
          setSuccess(true)
        }}
      />
      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  )
}

export default App
// Requirements:
// - Create a Progress Bar Component. It should follow the guidelines below:
// - Use React to build the user interface.
// - Display the percentage value in the middle.
// - Green Progress Fill Animation - #00c251
// - Add Accessibility
// - It should be a scalable component
