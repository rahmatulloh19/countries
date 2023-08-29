// debugger

const elMode = document.querySelector(".site-header__mode");
const mode = JSON.parse(localStorage.getItem("mode") || "false");
localStorage.setItem("mode", mode)

if(mode) {
  checkerMode(mode);
}
elMode.addEventListener("click", () => {
  if(!document.body.classList.contains("dark")) {
    document.body.classList.add("dark")
    localStorage.setItem("mode", true)
  } else {
    document.body.classList.remove("dark");
    document.body.removeAttribute("class");
    localStorage.setItem("mode", false)
  }
})

function checkerMode(mode) {
  document.body.classList.add("dark")
}