import { createContext, useContext, useEffect, useReducer } from "react"
import { filterReducer, shoppingCartReducer } from "./reducer"
const ShoppingCart = createContext()

const Context = ({ children }) => {
  //product state
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    products: [],
  }) //will take initial state and reducer and return an array

  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: "",
    //sort: "lowToHigh",
  })
  const fetchProducts = async () => {
    const res = await fetch(`/products.json`)
    const data = await res.json()

    if (data && data.products) {
      dispatch({
        type: "FETCH_PRODUCTS",
        payload: data.products,
      })
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    //now the state and dispatch is ava for whole app so we can use and  edit wehre ever we like
    <ShoppingCart.Provider
      value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </ShoppingCart.Provider>
  )
}

export const ShoppingCartState = () => {
  //wrapper funciton we can use it so we need not to insta;; contest agaoin agians
  return useContext(ShoppingCart) //use for accessing  shoppingcart state perticular state
}
export default Context
