"use strict";

import uiList from "./modules/ui.json";

import getSodexoCourses from "./modules/sodexo";

import getFazerCourses from "./modules/fazer";

const uifi = uiList.uiFi;
const uien = uiList.uiEn;
const link1 = document.querySelector("#link1");
const link2 = document.querySelector("#link2");
const link3 = document.querySelector("#link3");
const link4 = document.querySelector("#link4");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const langButton = document.querySelector("#langButton");
const dropRestaurant = document.querySelector(".dropRestaurant");
const dropSort = document.querySelector(".dropSort");
const dropFilter = document.querySelector(".dropFilter");
const listsortButton = document.querySelector("#listsortButton");
const restaurantContent = document.querySelector(".restaurantContent");
const sortContent = document.querySelector(".sortContent");
const filterContent = document.querySelector(".filterContent");
const restaurantButtons = Array.from(restaurantContent.children);
const sortButtons = Array.from(sortContent.children);
const filterButtons = Array.from(filterContent.children);
const mainCards = document.querySelector("#mainCards");
const dropbtn = document.querySelector(".dropbtn");
const nameAscButton = document.querySelector("#nameAsc");
const nameDescButton = document.querySelector("#nameDesc");
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
let restaurant = "sodexo";
let activeMenus = [];

const renderCards = async (courses) => {
  mainCards.innerHTML = "";

  await courses.forEach((course) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = course.name;

    const properties = document.createElement("p");
    properties.textContent = course.properties;

    const price = document.createElement("p");
    price.textContent = course.price + " €";

    card.appendChild(title);
    card.appendChild(properties);
    card.appendChild(price);
    mainCards.appendChild(card);
  });
};

const renderModal = (course) => {
  modalContent.textContent = "";

  const title = document.createElement("h3");
  title.textContent = course.name;

  const properties = document.createElement("p");
  properties.textContent = course.properties;

  const price = document.createElement("p");
  price.textContent = course.price + " €";

  modalContent.appendChild(title);
  modalContent.appendChild(properties);
  modalContent.appendChild(price);
};

const menuPriceCalc = async () => {
  if (lang === "fi") {
    menuPrice.textContent = "Hinta: ";
  }
  if (lang === "en") {
    menuPrice.textContent = "Price: ";
  }
  let courses = [];
  if (restaurant === "sodexo") {
    courses = activeMenus[0];
  }
  if (restaurant === "fazer") {
    courses = activeMenus[1];
  }
  menuPrice.textContent +=
    " " +
    courses.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2) +
    " €";
};

const raisePrices = async () => {
  let courses = [];
  if (restaurant === "sodexo") {
    courses = activeMenus[0];
  }
  if (restaurant === "fazer") {
    courses = activeMenus[1];
  }
  courses = courses.map((course) => {
    return {
      name: course.name,
      properties: course.properties,
      price: (course.price * 1.15).toFixed(2),
    };
  });
};

const sortCourses = (sort, courses) => {
  if (sort === "nameAsc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
    });
    sort = "nameAsc";
    return sortedCourses;
  }
  if (sort === "namedesc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.name > b.name) {
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

const filterCourses = (filter, courses) => {
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

const changelang = async () => {
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
  dropRestaurant.textContent = eval("ui" + lang + ".dropRestaurant");
  dropSort.textContent = eval("ui" + lang + ".dropSort");
  dropFilter.textContent = eval("ui" + lang + ".dropFilter");
  nameAscButton.textContent = eval("ui" + lang + ".nameAscButton");
  nameDescButton.textContent = eval("ui" + lang + ".nameDescButton");
  priceAscButton.textContent = eval("ui" + lang + ".priceAscButton");
  priceDescButton.textContent = eval("ui" + lang + ".priceDescButton");
  filterPriceButton.textContent = eval("ui" + lang + ".filterPrice");
  filterVegButton.textContent = eval("ui" + lang + ".filterVeg");
  randomButton.textContent = eval("ui" + lang + ".randomButton");
  menuPrice.textContent = eval("ui" + lang + ".menuPrice");

  if (restaurant === "sodexo") {
    menuPriceCalc();
    renderCards(sortCourses(sort, await getSodexoCourses(lang)));
  }
  if (restaurant === "fazer") {
    menuPriceCalc();
    renderCards(sortCourses(sort, await getFazerCourses(lang)));
  }
};

restaurantButtons.forEach((child) => {
  child.addEventListener("click", async () => {
    restaurant = child.value;
    if (child.value === "sodexo") {
      renderCards(await getSodexoCourses(lang));
      menuPriceCalc();
      restaurant = "sodexo";
    }
    if (child.value === "fazer") {
      renderCards(await getFazerCourses(lang));
      menuPriceCalc();
      restaurant = "fazer";
    }
  });
});

sortButtons.forEach((child) => {
  child.addEventListener("click", async () => {
    if (restaurant === "sodexo") {
      renderCards(sortCourses(child.value, await getSodexoCourses(lang)));
    }
    if (restaurant === "fazer") {
      renderCards(sortCourses(child.value, await getFazerCourses(lang)));
    }
  });
});

filterButtons.forEach((child) => {
  child.addEventListener("click", async () => {
    if (restaurant === "sodexo") {
      renderCards(filterCourses(child.value, await getSodexoCourses(lang)));
    }
    if (restaurant === "fazer") {
      renderCards(filterCourses(child.value, await getFazerCourses(lang)));
    }
  });
});

randomButton.addEventListener("click", () => {
  let courses = [];
  if (restaurant === "sodexo") {
    courses = activeMenus[0];
  }
  if (restaurant === "fazer") {
    courses = activeMenus[1];
  }
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  modal.classList.remove("hidden");
  renderModal(randomCourse);
});

closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

langButton.addEventListener("click", changelang);

const initialize = async () => {
  activeMenus = [await getSodexoCourses(lang), await getFazerCourses(lang)];

  raisePrices();

  menuPriceCalc();

  renderCards(activeMenus[0]);
};

initialize();

/*if (APP_CONF.productionMode && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}*/
