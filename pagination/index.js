document.addEventListener("DOMContentLoaded", function () {
  const app = document.querySelector(".app")
  //array to store product
  //variabe to store current  pages
  //https://dummyjson.com/products?limit=100
  let products = []
  let page = 1

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100")
      const data = await res.json()

      if (data && data.products) {
        products = data.products
        console.log(products)
        render()
      }
    } catch (error) {
      console.log("error fetching products:", error)
    }
  }

  const render = () => {
    const productsContainer = document.createElement("div")
    productsContainer.classList.add("products")
    const pagination = document.createElement("div")
    pagination.classList.add("pagination")

    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((prod) => {
        //if it is first page so start with product o to 10
        const productElement = document.createElement("div")
        productElement.classList.add("products_single")
        productElement.innerHTML = `
        <img  src="${prod.thumbnail}" alt="${prod.title}"/>
        <span>${prod.title}</span>
        `

        productsContainer.appendChild(productElement)
      })
      //pagination

      if (page > 1) {
        //hide the icon if page ==1
        const prevButton = createPaginationButton("⏮️", () => {
          selectPageHandler(page - 1)
        })
        pagination.appendChild(prevButton)
      }

      //dispaly no button
      for (let i = 0; i < products.length / 10; i++) {
        const pageButton = createPaginationButton(
          i + 1,
          () => {
            selectPageHandler(i + 1)
          },
          page === i + 1
        )
        pagination.appendChild(pageButton)
      }

      if (page < products.length / 10) {
        const nextButton = createPaginationButton("⏭️", () => {
          selectPageHandler(page + 1)
        })
        pagination.appendChild(nextButton)
      }
    }
    app.innerHTML = "" //to remove/scrap the prev data once we click next/prev
    app.appendChild(productsContainer)
    app.appendChild(pagination)
  }

  const createPaginationButton = (text, clickHandler, isSelected = false) => {
    const button = document.createElement("button")
    button.textContent = text
    button.addEventListener("click", clickHandler) //remove the click event and  use event delegation. try to attach event listener to the parent
    if (isSelected) {
      button.classList.add("pagination__selected")
    }
    return button
  }
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    ) {
      page = selectedPage
      render()
    }
  }
  fetchProducts()
})
