import { useEffect, useState } from "react"
import "./App.css"
const App = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${page * 10}`
      )
      const data = await res.json()

      setProducts(data)
      setPage(page + 1)
    } catch (error) {
      console.log("error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  //infinte loop function

  //we use throttling to avoid unnecessary api calls everytime
  const myThrottle = (cb, d) => {
    let last = 0
    return (...args) => {
      let now = new Date().getTime()
      if (now - last < d) return
      last = now
      return cb(...args)
    }
  }
  const handleScroll = myThrottle(() => {
    if (
      //window.innerHeight = height of viewport whatever u see on screen //scrolltop = height of scroll button
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !loading &&
      products.limit < products.total // height of the whole html page //when 500 px left from ground than all the api
    ) {
      // console.log("api call")
      fetchProducts()
    }
  }, 500) //500 ms

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    //when unmounted
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const { products: allProducts } = products
  return (
    <div>
      <h1>Infinite scrolling</h1>
      {allProducts?.length > 0 && (
        <div className="products">
          {allProducts?.map((prod) => {
            return (
              <div className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            )
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default App
