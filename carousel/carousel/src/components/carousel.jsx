import { useState, useEffect, useRef } from "react"

const Carousel = ({
  //defining the props
  images = [],
  isLoading = false,
  imageLimit = images.length,
  customPrevButton,
  customNextButton,
  onImgClick = () => {},
  imgPerSlide = 2,
}) => {
  const imgRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0) //it will keep a track of current idx
  const [imgWidth, setImgWidth] = useState(0) // to fix the image width
  console.log(currentIndex)

  //cases when images not provide to use
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0) //default to zero
    }
  }, [images])
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageLimit - 1 : prevIndex - 1
    )
  }
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageLimit - 1 ? 0 : prevIndex + 1
    )
  }
  console.log(imgRef?.current?.offsetWidth) //get current width of image. whenever the value of the ref changes it does not rerender the components
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel" style={{ width: imgPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * imgWidth}px)` }}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, index) => {
            return (
              <img
                onLoad={() => setImgWidth(imgRef?.current?.offsetWidth)}
                ref={imgRef}
                key={image.id}
                src={image.url}
                onClick={() => onImgClick(image, index)}
                alt={image.title}
                className="image"
              />
            )
          })}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  )
}

export default Carousel
