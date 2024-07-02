// Build a Highly Scalable Carousel Component in React JS.
// Requirements:
//   - We want to create a carousel component which takes array of images as input.
//   - The component should efficiently handle a large number of images while maintaining scalability, performance optimizations, and extensibility.
//   - Provide callback functions for events like image click, enabling users to define custom behavior.
//   - Focus on Accessibility.

import { useEffect, useState } from "react"
import "./App.css"
import Carousel from "./components/carousel" //virtualization

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
// Adding react-window Package:
// - Importing FixedSizeList from react-window. This is used to efficiently render large lists in React, which can significantly improve performance when dealing with a large number of images.

// import {FixedSizeList as List} from "react-window";

// Refactoring Image Rendering:
// - Removed the direct mapping of images inside the <div className="image-container">.
// - Defined a new component called Column that represents each image within the FixedSizeList.
// - Column component receives index and style props from react-window.

// const Column = ({index, style}) => (
//   <div style={style}>
//     {/* Image rendering logic */}
//   </div>
// );

// Updating Image Rendering in FixedSizeList:
// - Replaced the direct mapping of images with the List component from react-window.
// - Used Column component inside List to render each image efficiently.

// <List
//   ref={listRef}
//   height={400} // Specify the height of the visible area
//   itemCount={images.length} // Number of items in the list
//   itemSize={400} // Height of each item
//   layout="horizontal" // Horizontal layout
//   width={800} // Specify the width of the visible area
// >
//   {Column} {/* Render each image using Column component */}
// </List>

// Updating Image Scroll Behavior:
// - Removed the inline style for transforming images based on currentIndex * imgWidth.
// - Added a useEffect hook to update the scroll position of the List based on currentIndex and imgWidth.

//     useEffect(() => {
//       listRef.current.scrollTo(currentIndex * imgWidth);
//     }, [currentIndex]);
