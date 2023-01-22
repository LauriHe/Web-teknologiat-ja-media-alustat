"use strict";

import lunchMenu from "./modules/sodexo.json";
let sodexoCourses = [];
Object.entries(lunchMenu.courses).forEach((course) => {
  sodexoCourses.push(course.pop());
});

import fazerFi from "./modules/fazerFi.json";
let fazerCoursesFi = [];
Object.entries(fazerFi.MenusForDays.SetMenus).forEach((menu) => {
  fazerCoursesFi.push(menu);
});
console.log("fazer courses: " + fazerCoursesFi);

import uiList from "./modules/ui.json";
const uifi = uiList.uiFi;
const uien = uiList.uiEn;

import variables from "./modules/mainVariables";

import sodexoFunctions from "./modules/sodexoFunctions";

const changelang = () => {
  if (variables.lang === "fi") {
    variables.lang = "en";
  } else {
    variables.lang = "fi";
  }
  variables.link1.textContent = eval("ui" + variables.lang + ".link1");
  variables.link2.textContent = eval("ui" + variables.lang + ".link2");
  variables.link3.textContent = eval("ui" + variables.lang + ".link3");
  variables.link4.textContent = eval("ui" + variables.lang + ".link4");
  variables.p1.textContent = eval("ui" + variables.lang + ".p1");
  variables.p2.textContent = eval("ui" + variables.lang + ".p2");
  variables.langButton.textContent = eval(
    "ui" + variables.lang + ".langButton"
  );
  variables.dropbtn.textContent = eval("ui" + variables.lang + ".dropbtn");
  variables.nameAscButton.textContent = eval(
    "ui" + variables.lang + ".nameAscButton"
  );
  variables.namedescButton.textContent = eval(
    "ui" + variables.lang + ".nameDescButton"
  );
  variables.priceAscButton.textContent = eval(
    "ui" + variables.lang + ".priceAscButton"
  );
  variables.priceDescButton.textContent = eval(
    "ui" + variables.lang + ".priceDescButton"
  );
  variables.filterPriceButton.textContent = eval(
    "ui" + variables.lang + ".filterPrice"
  );
  variables.filterVegButton.textContent = eval(
    "ui" + variables.lang + ".filterVeg"
  );
  variables.randomButton.textContent = eval(
    "ui" + variables.lang + ".randomButton"
  );
  variables.menuPrice.textContent = eval("ui" + variables.lang + ".menuPrice");
  menuPriceCalc();
  renderCards(sortCourses(variables.sort));
};

const validateName = (name) => {
  const pattern = /^[A-Z].{3,63}/;
  return pattern.test(name);
};

variables.restaurantButtons.forEach((child) => {
  child.addEventListener("click", () => {
    variables.restaurant = child.value;
    if (child.value === "sodexo") {
      sodexoFunctions.renderCards(sodexoCourses);
    }
    if (child.value === "fazer") {
      if (variables.lang === "fi") {
        fazerFunctions.renderCards(fazerCoursesFi);
      } else {
        fazerFunctions.renderCards(fazerCoursesEn);
      }
    }
  });
});

variables.sortButtons.forEach((child) => {
  child.addEventListener("click", () => {
    sodexoFunctions.renderCards(sodexoFunctions.sortCourses(child.value));
  });
});

variables.filterButtons.forEach((child) => {
  child.addEventListener("click", () => {
    sodexoFunctions.renderCards(sodexoFunctions.filterCourses(child.value));
  });
});

variables.randomButton.addEventListener("click", () => {
  const randomCourse =
    sodexoCourses[Math.floor(Math.random() * sodexoCourses.length)];
  variables.modal.classList.remove("hidden");
  sodexoFunctions.renderModal(randomCourse);
});

variables.closeButton.addEventListener("click", () => {
  variables.modal.classList.add("hidden");
});

variables.langButton.addEventListener("click", changelang);

sodexoFunctions.raisePrices();

sodexoFunctions.menuPriceCalc();

sodexoFunctions.renderCards(sodexoCourses);
