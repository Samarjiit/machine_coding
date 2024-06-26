// Build a Highly Scalable Carousel Component in React JS.
// Requirements:
//   - We want to create a carousel component which takes array of images as input.
//   - The component should efficiently handle a large number of images while maintaining scalability, performance optimizations, and extensibility.
//   - Provide callback functions for events like image click, enabling users to define custom behavior.
//   - Focus on Accessibility.

import { useEffect, useState } from "react"
import "./App.css"
import Carousel from "./components/carousel"

const App = () => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  // console.log(images)
  //

  const fetchImages = async (imgLimit) => {
    setLoading(true)
    try {
      const response = await fetch(
        ` https://jsonplaceholder.typicode.com/photos?_limit=${imgLimit}`
      )
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.log("error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }
  //component load for the very first time
  useEffect(() => {
    fetchImages(8)
  }, [])
  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        imgPerSlide={2}
        imageLimit={4}
        customPrevButton={(onClick) => (
          <button
            className="btn prev"
            style={{ background: "red" }}
            onClick={onClick}
          >
            Prev
          </button>
        )}
        customNextButton={(onClick) => (
          <button className="btn next" onClick={onClick}>
            Next
          </button>
        )}
      />
      {/* 
      imagePerSlide={}
      imageLimit={} 
      customPrevButton={} 
      customNextButton={} */}
    </div>
  )
}

export default App
