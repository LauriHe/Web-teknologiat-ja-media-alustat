"use strict";

import lunchMenu from "./modules/sodexo.json";
let sodexoCourses = [];
Object.entries(lunchMenu.courses).forEach((course) => {
  sodexoCourses.push(course.pop());
});

import fazerfi from "./modules/fazerFi.json";
let fazerCoursesfi = [];
Object.entries(fazerfi.MenusForDays[0].SetMenus).forEach((menu) => {
  fazerCoursesfi.push(menu[1]);
});

import fazeren from "./modules/fazerEn.json";
let fazerCoursesen = [];
Object.entries(fazeren.MenusForDays[0].SetMenus).forEach((menu) => {
  fazerCoursesen.push(menu[1]);
});

import uiList from "./modules/ui.json";
const uifi = uiList.uiFi;
const uien = uiList.uiEn;

import variables from "./modules/mainVariables";

import sodexoFunctions from "./modules/sodexoFunctions";

import fazerFunctions from "./modules/fazerFunctions";

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
  variables.dropRestaurant.textContent = eval(
    "ui" + variables.lang + ".dropRestaurant"
  );
  variables.dropSort.textContent = eval("ui" + variables.lang + ".dropSort");
  variables.dropFilter.textContent = eval(
    "ui" + variables.lang + ".dropFilter"
  );
  variables.nameAscButton.textContent = eval(
    "ui" + variables.lang + ".nameAscButton"
  );
  variables.nameDescButton.textContent = eval(
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
  if (variables.restaurant === "sodexo") {
    sodexoFunctions.menuPriceCalc();
    sodexoFunctions.renderCards(sodexoFunctions.sortCourses(variables.sort));
  }
  if (variables.restaurant === "fazer") {
    fazerFunctions.renderCards(eval("fazerCourses" + variables.lang));
  }
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
      variables.restaurant = "sodexo";
    }
    if (child.value === "fazer") {
      if (variables.lang === "fi") {
        fazerFunctions.renderCards(fazerCoursesfi);
      } else {
        fazerFunctions.renderCards(fazerCoursesen);
      }
      variables.restaurant = "fazer";
    }
  });
});

variables.sortButtons.forEach((child) => {
  child.addEventListener("click", () => {
    if (variables.restaurant === "sodexo") {
      sodexoFunctions.renderCards(sodexoFunctions.sortCourses(child.value));
    }
  });
});

variables.filterButtons.forEach((child) => {
  child.addEventListener("click", () => {
    if (variables.restaurant === "sodexo") {
      sodexoFunctions.renderCards(sodexoFunctions.filterCourses(child.value));
    }
  });
});

variables.randomButton.addEventListener("click", () => {
  if (variables.restaurant === "sodexo") {
    const randomCourse =
      sodexoCourses[Math.floor(Math.random() * sodexoCourses.length)];
    variables.modal.classList.remove("hidden");
    sodexoFunctions.renderModal(randomCourse);
  }
});

variables.closeButton.addEventListener("click", () => {
  variables.modal.classList.add("hidden");
});

variables.langButton.addEventListener("click", changelang);

sodexoFunctions.raisePrices();

sodexoFunctions.menuPriceCalc();

sodexoFunctions.renderCards(sodexoCourses);
