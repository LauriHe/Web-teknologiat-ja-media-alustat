"use strict";

import lunchMenu from "./assets/sodexo.json";
let courses = [];
Object.entries(lunchMenu.courses).forEach((course) => {
  courses.push(course.pop());
});

import uiList from "./assets/ui.json";
const uifi = uiList.uiFi;
const uien = uiList.uiEn;

const link1 = document.querySelector("#link1");
const link2 = document.querySelector("#link2");
const link3 = document.querySelector("#link3");
const link4 = document.querySelector("#link4");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const langButton = document.querySelector("#langButton");
const listsortButton = document.querySelector("#listsortButton");
const sortContent = document.querySelector(".sortContent");
const filterContent = document.querySelector(".filterContent");
const sortButtons = Array.from(sortContent.children);
const filterButtons = Array.from(filterContent.children);
const mainCards = document.querySelector("#mainCards");
const dropbtn = document.querySelector(".dropbtn");
const nameAscButton = document.querySelector("#nameAsc");
const namedescButton = document.querySelector("#nameDesc");
const priceAscButton = document.querySelector("#priceAsc");
const priceDescButton = document.querySelector("#priceDesc");
const filterPriceButton = document.querySelector("#filterPrice");
const filterVegButton = document.querySelector("#filterVeg");
const randomButton = document.querySelector("#randomButton");
const menuPrice = document.querySelector("#menuPrice");
const closeButton = document.querySelector("#closeButton");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");

let lang = "fi";
let sort = "";

const menuPriceCalc = () => {
  menuPrice.textContent +=
    " " + courses.reduce((a, b) => a + parseFloat(b.price), 0) + " €";
};

const raisePrices = () => {
  courses = courses.map((course) => {
    return {
      title_fi: course.title_fi,
      title_en: course.title_en,
      category: course.category,
      properties: course.properties,
      price: (course.price * 1.15).toFixed(2),
    };
  });
  console.log(courses);
};

const sortCourses = (sort) => {
  if (sort === "nameAsc") {
    const sortedCourses = courses.sort((a, b) => {
      if (eval("a.title_" + lang) < eval("b.title_" + lang)) {
        return -1;
      }
    });
    sort = "nameAsc";
    return sortedCourses;
  }
  if (sort === "namedesc") {
    const sortedCourses = courses.sort((a, b) => {
      if (eval("a.title_" + lang) > eval("b.title_" + lang)) {
        return -1;
      }
    });
    sort = "namedesc";
    return sortedCourses;
  }
  if (sort === "priceAsc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
    });
    sort = "priceAsc";
    return sortedCourses;
  }
  if (sort === "priceDesc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
    });
    sort = "priceDesc";
    return sortedCourses;
  }
  return courses;
};

const filterCourses = (filter) => {
  if (filter === "price") {
    const filteredCourses = courses.filter((course) => course.price < 5);
    return filteredCourses;
  }
  if (filter === "veg") {
    const filteredCourses = courses.filter((course) =>
      course.properties.includes("Veg")
    );
    return filteredCourses;
  }
};

const renderCards = (courses) => {
  mainCards.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = eval("course.title_" + lang);

    const category = document.createElement("p");
    category.textContent = course.category;

    const properties = document.createElement("p");
    properties.textContent = course.properties;

    const price = document.createElement("p");
    price.textContent = course.price + " €";

    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(properties);
    card.appendChild(price);
    mainCards.appendChild(card);
  });
};

const changeLang = () => {
  if (lang === "fi") {
    lang = "en";
  } else {
    lang = "fi";
  }
  link1.textContent = eval("ui" + lang + ".link1");
  link2.textContent = eval("ui" + lang + ".link2");
  link3.textContent = eval("ui" + lang + ".link3");
  link4.textContent = eval("ui" + lang + ".link4");
  p1.textContent = eval("ui" + lang + ".p1");
  p2.textContent = eval("ui" + lang + ".p2");
  langButton.textContent = eval("ui" + lang + ".langButton");
  dropbtn.textContent = eval("ui" + lang + ".dropbtn");
  nameAscButton.textContent = eval("ui" + lang + ".nameAscButton");
  namedescButton.textContent = eval("ui" + lang + ".nameDescButton");
  priceAscButton.textContent = eval("ui" + lang + ".priceAscButton");
  priceDescButton.textContent = eval("ui" + lang + ".priceDescButton");
  filterPriceButton.textContent = eval("ui" + lang + ".filterPrice");
  filterVegButton.textContent = eval("ui" + lang + ".filterVeg");
  randomButton.textContent = eval("ui" + lang + ".randomButton");
  menuPrice.textContent = eval("ui" + lang + ".menuPrice");
  menuPriceCalc();
  renderCards(sortCourses(sort));
};

const renderModal = (course) => {
  modalContent.textContent = "";

  const title = document.createElement("h3");
  title.textContent = eval("course.title_" + lang);

  const category = document.createElement("p");
  category.textContent = course.category;

  const properties = document.createElement("p");
  properties.textContent = course.properties;

  const price = document.createElement("p");
  price.textContent = course.price;

  modalContent.appendChild(title);
  modalContent.appendChild(category);
  modalContent.appendChild(properties);
  modalContent.appendChild(price);
};

const validateName = (name) => {
  const pattern = /^[A-Z].{3,63}/;
  return pattern.test(name);
};

sortButtons.forEach((child) => {
  child.addEventListener("click", () => {
    renderCards(sortCourses(child.value));
  });
});

filterButtons.forEach((child) => {
  child.addEventListener("click", () => {
    renderCards(filterCourses(child.value));
  });
});

randomButton.addEventListener("click", () => {
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  modal.classList.remove("hidden");
  renderModal(randomCourse);
});

closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

langButton.addEventListener("click", changeLang);

raisePrices();

menuPriceCalc();

renderCards(courses);
