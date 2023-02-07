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
const searchInput = document.querySelector("#searchInput");
const suggestions = document.querySelector("#suggestions");
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

// Render the courses as cards on the page
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

// Render a modal to display the course details
const renderModal = (course) => {
  modal.classList.remove("hidden");
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

// Calculate the total price of the current menu
const menuPriceCalc = async () => {
  // Change the text of the menu price depending on the language
  if (lang === "fi") {
    menuPrice.textContent = "Hinta: ";
  }
  if (lang === "en") {
    menuPrice.textContent = "Price: ";
  }

  // Get the courses from the active restaurant
  let courses = [];
  if (restaurant === "sodexo") {
    courses = activeMenus[0];
  }
  if (restaurant === "fazer") {
    courses = activeMenus[1];
  }

  // Calculate the total price
  menuPrice.textContent +=
    " " +
    courses.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2) +
    " €";
};

// Raise the price of all courses by 15%
const raisePrices = async () => {
  // Get the courses from the active restaurant
  let courses = [];
  if (restaurant === "sodexo") {
    courses = activeMenus[0];
  }
  if (restaurant === "fazer") {
    courses = activeMenus[1];
  }

  // Use map to create a new array with the new prices
  courses = courses.map((course) => {
    return {
      name: course.name,
      properties: course.properties,
      price: (course.price * 1.15).toFixed(2),
    };
  });
};

// Return a new array of courses that matches the chosen sorting method
const sortCourses = (sort, courses) => {
  // Sort by name ascending
  if (sort === "nameAsc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
    });
    sort = "nameAsc";
    return sortedCourses;
  }
  // Sort by name descending
  if (sort === "namedesc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
    });
    sort = "namedesc";
    return sortedCourses;
  }
  // Sort by price ascending
  if (sort === "priceAsc") {
    const sortedCourses = courses.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
    });
    sort = "priceAsc";
    return sortedCourses;
  }
  // Sort by price descending
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

// Return a new array of courses that match the filter
const filterCourses = (filter, courses) => {
  if (filter === "price") {
    const filteredCourses = courses.filter((course) => course.price < 5); // filter out courses that cost more than 5 euros
    return filteredCourses;
  }
  if (filter === "veg") {
    const filteredCourses = courses.filter(
      (course) => course.properties.includes("Veg") // filter out courses that are not vegetarian
    );
    return filteredCourses;
  }
};

// Change the language of the page
const changelang = async () => {
  // Change the language variable
  if (lang === "fi") {
    lang = "en";
  } else {
    lang = "fi";
  }

  // Change the language of all ui elements. Text content is taken from ui json file.
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

  // Render the cards again with the new language.
  if (restaurant === "sodexo") {
    menuPriceCalc();
    renderCards(sortCourses(sort, await getSodexoCourses(lang)));
  }
  if (restaurant === "fazer") {
    menuPriceCalc();
    renderCards(sortCourses(sort, await getFazerCourses(lang)));
  }
};

// Provide search suggestions every time a key is pressed.
searchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value; // Save current input value.

  suggestions.innerHTML = ""; // Clear previous suggestions.
  const ul = document.createElement("ul");
  suggestions.appendChild(ul);

  let matches = []; // Array to store matching course names.

  let index = 0; // Save index of active restaurant.
  if (restaurant === "sodexo") {
    index = 0;
  }
  if (restaurant === "fazer") {
    index = 1;
  }

  // loop through active restaurant's courses and push matching names to matches array.
  activeMenus[index].forEach((course) => {
    // Find if course name includes current input value. "toLowerCase()" is used to make the search case insensitive.
    if (course.name.toLowerCase().includes(searchString.toLowerCase())) {
      matches.push(course.name);
    }
  });

  // Don't show suggestions if input is empty.
  if (searchString.length === 0) {
    matches = [];
  }

  // Limit suggestions to 4. This is to prevent the suggestions list from getting too long.
  if (matches.length > 4) {
    matches.length = matches.length = 4;
  }

  // Create a list item for each match and add it to the suggestions list.
  matches.forEach((match) => {
    const li = document.createElement("li");
    li.textContent = match;

    // Add event listener to each list item. When clicked, clear suggestions and render modal.
    li.addEventListener("click", () => {
      const course = activeMenus[index].find((course) => course.name === match);
      suggestions.innerHTML = "";
      renderModal(course);
    });

    ul.appendChild(li);
  });
});

// Event listeners for each restaurant button
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

// Event listeners for each sort button
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

// Event listeners for each filter button
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

// Pick a random course
randomButton.addEventListener("click", () => {
  // Get courses from active restaurant
  let courses = [];
  if (restaurant === "sodexo") {
    courses = activeMenus[0];
  }
  if (restaurant === "fazer") {
    courses = activeMenus[1];
  }
  const randomCourse = courses[Math.floor(Math.random() * courses.length)]; // Randomly pick a course
  renderModal(randomCourse);
});

// Close modal
closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  searchInput.value = "";
});

// Change language
langButton.addEventListener("click", changelang);

// Get menu data from api and render cards
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
