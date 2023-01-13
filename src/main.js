"use strict";

const link1 = document.querySelector("#link1");
const link2 = document.querySelector("#link2");
const link3 = document.querySelector("#link3");
const link4 = document.querySelector("#link4");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const langButton = document.querySelector("#langButton");
const listsortButton = document.querySelector("#listsortButton");
const dropdownContent = document.querySelector(".dropdownContent");
const dropdownButtons = Array.from(dropdownContent.children);
const mainCards = document.querySelector("#mainCards");
const dropbtn = document.querySelector(".dropbtn");
const ascButton = document.querySelector("#asc");
const descButton = document.querySelector("#desc");
const randomButton = document.querySelector("#randomButton");
const closeButton = document.querySelector("#closeButton");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal h3");

let lang = "fi";

const uiFi = {
  link1: "Etusivu",
  link2: "Ruokalistat",
  link3: "Ravintolat",
  link4: "Yhteystiedot",
  p1: "Missä tänään syötäisiin?",
  p2: `Missä tänään syötäisiin? Tuttu tarina ennen lounashetkeä. Palvelu
  etsii lähelläsi olevat lounaspaikat, sekä näyttää niiden päivittäisen
  lounaslistan. Viikottaiset lounaslistat ovat myös käytettävissäsi.
  Pääset niihin klikkaamalla ravintolan logoa.`,
};

const uiEn = {
  link1: "Home",
  link2: "Lucnh menus",
  link3: "Restaurants",
  link4: "Contact",
  p1: "Where to eat today?",
  p2: `Where to eat today? A familiar story before lunch. The service
  searches lunch restaurants near you and displays their daily menus.
  Weekly lunch menus are also available.
  See them by clicking the restauran's logo.`,
};

const coursesFi = [
  "Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "vegaani Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lunch baguette with BBQ-turkey filling",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset",
];

const coursesEn = [
  "Hamburger, cream sauce and poiled potates",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloum burger and french fries",
];

let courses = coursesFi;
let sort = "";

const sortCourses = (sort) => {
  if (sort === "") {
    return courses;
  }
  if (sort === "asc") {
    const sortedCourses = courses.sort();
    sort = "asc";
    return sortedCourses;
  }
  if (sort === "desc") {
    const sortedCourses = courses.sort().reverse();
    sort = "desc";
    return sortedCourses;
  }
};

const renderCards = (courses) => {
  mainCards.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = course;

    card.appendChild(cardTitle);
    mainCards.appendChild(card);
  });
};

const changeLang = () => {
  if (lang === "fi") {
    lang = "en";
    link1.textContent = uiEn.link1;
    link2.textContent = uiEn.link2;
    link3.textContent = uiEn.link3;
    link4.textContent = uiEn.link4;
    p1.textContent = uiEn.p1;
    p2.textContent = uiEn.p2;
    langButton.textContent = "FI";
    dropbtn.textContent = "Sort by";
    ascButton.textContent = "A - Z";
    descButton.textContent = "Z - A";
    randomButton.textContent = "Pick a random course";
    courses = coursesEn;
    renderCards(sortCourses(sort));
  } else {
    lang = "fi";
    link1.textContent = uiFi.link1;
    link2.textContent = uiFi.link2;
    link3.textContent = uiFi.link3;
    link4.textContent = uiFi.link4;
    p1.textContent = uiFi.p1;
    p2.textContent = uiFi.p2;
    langButton.textContent = "EN";
    dropbtn.textContent = "järjestä";
    ascButton.textContent = "A - Ö";
    descButton.textContent = "Ö - A";
    randomButton.textContent = "Valitse satunnainen ruoka";
    courses = coursesFi;
    renderCards(sortCourses(sort));
  }
};

langButton.addEventListener("click", changeLang);

dropdownButtons.forEach((child) => {
  child.addEventListener("click", () => {
    renderCards(sortCourses(child.value));
  });
});

randomButton.addEventListener("click", () => {
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  modal.classList.remove("hidden");
  modalTitle.textContent = randomCourse;
});

closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

renderCards(courses);
