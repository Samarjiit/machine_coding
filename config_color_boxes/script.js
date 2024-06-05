const boxConfig = [
  { color: "red", width: "33.33%" },
  { color: "green", width: "33.33%" },
  { color: "blue", width: "33.33%" },
  { color: "yellow", width: "50%" },
  { color: "orange", width: "50%" },
  { color: "purple", width: "70%" },
  { color: "pink", width: "30%" },
]

const container = document.createElement("div")
container.className = "container"

boxConfig.forEach((config, index) => {
  const box = document.createElement("div")
  box.className = "box"
  box.style.backgroundColor = config.color
  box.style.width = config.width
  container.appendChild(box)
})

container.addEventListener("click", (event) => {
  const clickElement = event.target

  if (clickElement.classList.contains("box")) {
    const index = Array.from(container.children).indexOf(clickElement)
    const config = boxConfig[index]
    alert(`color of box ${index + 1} is ${config.color}`)
  }
})

document.body.appendChild(container)

//apply event delegation - instead of apply listener on every box we use listener on pareant
