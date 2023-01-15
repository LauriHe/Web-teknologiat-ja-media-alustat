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
const dropdownContent = document.querySelector(".dropdownContent");
const dropdownButtons = Array.from(dropdownContent.children);
const mainCards = document.querySelector("#mainCards");
const dropbtn = document.querySelector(".dropbtn");
const ascButton = document.querySelector("#asc");
const descButton = document.querySelector("#desc");
const randomButton = document.querySelector("#randomButton");
const closeButton = document.querySelector("#closeButton");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");

let lang = "fi";
let sort = "";

const sortCourses = (sort) => {
  if (sort === "") {
    return courses;
  }
  if (sort === "asc") {
    const sortedCourses = courses.sort((a, b) => {
      if (eval("a.title_" + lang) < eval("b.title_" + lang)) {
        return -1;
      }
    });
    sort = "asc";
    return sortedCourses;
  }
  if (sort === "desc") {
    const sortedCourses = courses.sort((a, b) => {
      if (eval("a.title_" + lang) > eval("b.title_" + lang)) {
        return -1;
      }
    });
    sort = "desc";
    return sortedCourses;
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
    price.textContent = course.price;

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
  ascButton.textContent = eval("ui" + lang + ".ascButton");
  descButton.textContent = eval("ui" + lang + ".descButton");
  randomButton.textContent = eval("ui" + lang + ".randomButton");
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

langButton.addEventListener("click", changeLang);

dropdownButtons.forEach((child) => {
  child.addEventListener("click", () => {
    renderCards(sortCourses(child.value));
  });
});

randomButton.addEventListener("click", () => {
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  modal.classList.remove("hidden");
  renderModal(randomCourse);
});

closeButton.addEventListener("click", () => {
  console.log("close");
  modal.classList.add("hidden");
});

renderCards(courses);
