const elList = document.querySelector(".js-list__list");
const elForm = document.querySelector(".js-hero__form");
const elSearch = document.querySelector(".js-hero__input");
const elSelect = document.querySelector(".js-hero__select");
const elMode = document.querySelector(".site-header__mode");

const collectorFragment = document.createDocumentFragment();
const mode = JSON.parse(localStorage.getItem("mode") || "false");
localStorage.setItem("mode", mode)
if(mode) {
  document.body.classList.add("dark")
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

async function getFlagsData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderFlags(data);
  } catch (error) {
    const err = error.message;
    renderFlags(err)
  }
}

function renderFlags(data) {
  elList.innerHTML = "";
  if(typeof data === "object") {
    data.forEach(item => {
      const liElement = document.createElement("li");
      liElement.classList.add("list__item");
      liElement.innerHTML = `
      <img class="list__img" src="${item.flags.svg}"
      width="264"
      height="160"
      alt="${item.flags.alt}">
      <div class="list__item-inner">
      <h3 class="list__subtitle">${item.name.common}</h3>
      <ul class="list__inner-list">
      <li class="list__inner-item">
      <strong class="list__bold">Population:</strong> ${item.population}
      </li>
      <li class="list__inner-item">
      <strong class="list__bold">Region:</strong> ${item.region}
      </li>
      <li class="list__inner-item">
      <strong class="list__bold">Capital:</strong> ${item.capital}
      </li>
      </ul>
      </div>
      `
      collectorFragment.appendChild(liElement);
    });
    elList.appendChild(collectorFragment);
  } else {
    elList.textContent = "Please, enter the correct country name";
  }
}

getFlagsData("https://restcountries.com/v3.1/all");

elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  
  const elSearchValue = elSearch.value.trim();
  const elSelectValue = elSelect.value;
  
  if(elSelectValue && !elSearchValue) {
    getFlagsData(`https://restcountries.com/v3.1/region/${elSelectValue}`);
  } else if(elSearchValue && !elSelectValue){
    getFlagsData(`https://restcountries.com/v3.1/name/${elSearchValue}`);
  } else {
    elList.textContent = "Please select the desired region or search for a country"
  }
})