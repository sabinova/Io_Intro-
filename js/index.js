// adding footer section and copyright
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `Sabina Ruzieva &copy; ${thisYear}`;
footer.appendChild(copyright);

// adding skill items
document.addEventListener("DOMContentLoaded", () => {
  const skills = [
    { imgSrc: "img/html.png", altText: "html_logo", title: "HTML" },
    { imgSrc: "img/css.jpg", altText: "css_logo", title: "CSS" },
    { imgSrc: "img/js.jpg", altText: "js_logo", title: "JavaScript" },
    { imgSrc: "img/python.png", altText: "python_logo", title: "Python" },
    { imgSrc: "img/linux.png", altText: "linux_logo", title: "Linux" },
    { imgSrc: "img/github.png", altText: "github_logo", title: "GitHub" },
  ];

  const skillsContainer = document.querySelector(".skills-container");

  skills.forEach((skill) => {
    const listItem = document.createElement("li");
    listItem.classList.add("skill-box");

    const skillTitle = document.createElement("div");
    skillTitle.classList.add("skill-title");

    const skillImg = document.createElement("div");
    skillImg.classList.add("skill-img");

    const img = document.createElement("img");
    img.src = skill.imgSrc;
    img.alt = skill.altText;
    img.classList.add("skill-icon");

    skillImg.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = skill.title;

    skillTitle.appendChild(skillImg);
    skillTitle.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";

    listItem.appendChild(skillTitle);
    listItem.appendChild(p);

    skillsContainer.appendChild(listItem);
  });
});

// active scrolling and menu-icon
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Use template literals for proper string interpolation
      // and add a null check before accessing classList
      const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Selects the form by name attribute
const messageForm = document.getElementsByName("leave_message")[0];

// Adds event listener for form submission
messageForm.addEventListener("submit", function (event) {
  // Prevents the default form submission behavior
  event.preventDefault();

  // Retrieves values from the form fields
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  // Resets form fields
  messageForm.reset();

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a>: <span>${usersMessage}</span>`;

  // Creates a remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  // Adds event listener to the remove button
  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode; // Find the parent <li>
    entry.remove(); // Remove the entry from the DOM
    // Hide the message section if the list is empty
    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  // Creates an edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  // Adds event listener to the edit button
  editButton.addEventListener("click", function () {
    // Prompt the user for a new message
    const newMessageText = prompt("Edit your message:", usersMessage);
    if (newMessageText !== null) {
      // Updates the message span with the new text
      newMessage.querySelector("span").innerText = newMessageText;
    }
  });

  // Appends the remove and edit buttons to the new message
  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);
  // Appends the new message to the message list
  messageList.appendChild(newMessage);

  // Shows the message section if it was hidden
  messageSection.style.display = "block";
});


//get repositories from github; get response
fetch("https://api.github.com/users/sabinova/repos")
  .then((response) => response.json())
  .then((repositories) => {
    let projectSection = document.getElementById("Projects");
    let projectList = projectSection.querySelector("ul");
    for (let i = 0; i < repositories.length; i++) {
      //creates repositaries list
      const project = document.createElement("li");
      project.innerHTML = `<a href="${repositories[i].html_url}" target="_blank">${repositories[i].name}</a>`;
      projectList.appendChild(project);
    }
  })

  .catch((error) => {
    console.error("An error occurred:", error);
  });
