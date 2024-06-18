import { useRef } from "react"
const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000) //time in sec

const useCache = (key, expirationInSeconds) => {
  const cache = useRef(JSON.parse(localStorage.getItem(key)) || {}) //persist throughout the rerender
  const setCache = (query, data) => {
    const timestamp = getCurrentTimeStamp()
    cache.current[query] = { data, timestamp }
    localStorage.setItem(key, JSON.stringify(cache.current))
  }

  const getCache = (query) => {
    const cachedData = cache.current[query]
    if (cachedData) {
      const { data, timestamp } = cachedData
      if (getCurrentTimeStamp() - timestamp < expirationInSeconds) return data
      else {
        delete cache.current[query]
        localStorage.setItem(key, JSON.stringify(cache.current))
      }
    }
    return null
  }

  return { setCache, getCache }
}

export default useCache
