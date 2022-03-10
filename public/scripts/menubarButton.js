const menubarButtonElement = document.getElementById("menubar");
const menuItems = document.querySelector("nav");
toggle = () => {
  menuItems.classList.toggle("nav-item");
};

menubarButtonElement.addEventListener("click", toggle);
