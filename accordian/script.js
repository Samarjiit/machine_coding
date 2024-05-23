//configuration
const sections = [
  {
    title: "Tab 1",
    content: "This is a content for Tab 1",
  },
  {
    title: "Tab 2",
    content: "This is a content for Tab 2",
  },
  {
    title: "Tab 3",
    content: "This is a content for Tab 3",
  },
  // Add more tabs object as needed
]

document.addEventListener("DOMContentLoaded", function () {
  const accordionContainer = document.querySelector("#accordion")

  //render all the sections
  sections.forEach((section, index) => {
    const sectionItem = document.createElement("div")
    sectionItem.classList.add("accordion-item")

    const sectionHeader = document.createElement("div")
    sectionHeader.classList.add("accordion-header")
    sectionHeader.textContent = section.title //to add only text

    const sectionContent = document.createElement("div")
    sectionContent.classList.add("accordion-content")
    sectionContent.innerHTML = `<p>${section.content}</p>` //to add html tag and content

    sectionItem.appendChild(sectionHeader)
    sectionItem.appendChild(sectionContent)
    accordionContainer.appendChild(sectionItem)

    //display the first default accordion
    if (index == 0) {
      sectionItem.classList.add("active")
      sectionContent.style.display = "block"
    }
  })
  //technique in JavaScript where we delegate the responsibility of handling an event to a parent element. . By doing so, we avoid attaching multiple event listeners to individual elements, especially when dealing with a large number of similar elements, such as a list or a table
  accordionContainer.addEventListener("click", function (event) {
    const header = event.target.closest(".accordion-header") //closest header -The closest() method searches up the DOM tree for elements which matches a specified CSS selector. The closest() method starts at the element itself, then the anchestors (parent, grandparent, ...) until a match is found. The closest() method returns null() if no match is found
    if (!header) return

    const sectionItem = header.parentNode //access to the complete node-section
    const content = sectionItem.querySelector(".accordion-content")
    const isActive = sectionItem.classList.contains("active")

    //close all the sections
    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active")
      item.querySelector(".accordion-content").style.display = "none"
    })

    if (!isActive) {
      sectionItem.classList.add("active")
      content.style.display = "block"
    }
  })
})
