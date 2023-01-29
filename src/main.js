"use strict";

import variables from "./modules/mainVariables";

import getSodexoCourses from "./modules/sodexo";

import getFazerCourses from "./modules/fazer";

const renderCards = (courses) => {
  variables.mainCards.innerHTML = "";

  courses.forEach((course) => {
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
    variables.mainCards.appendChild(card);
  });
};

const renderModal = (course) => {
  variables.modalContent.textContent = "";

  const title = document.createElement("h3");
  title.textContent = course.name;

  const properties = document.createElement("p");
  properties.textContent = course.properties;

  const price = document.createElement("p");
  price.textContent = course.price + " €";

  variables.modalContent.appendChild(title);
  variables.modalContent.appendChild(properties);
  variables.modalContent.appendChild(price);
};

const menuPriceCalc = () => {
  let courses = [];
  if (variables.restaurant === "sodexo") {
    courses = getSodexoCourses(variables.lang);
  }
  if (variables.restaurant === "fazer") {
    courses = getFazerCourses(variables.lang);
  }
  variables.menuPrice.textContent +=
    " " +
    courses.reduce((a, b) => a + parseFloat(b.price), 0).toFixed(2) +
    " €";
};

const raisePrices = () => {
  let courses = [];
  if (variables.restaurant === "sodexo") {
    courses = getSodexoCourses(variables.lang);
  }
  if (variables.restaurant === "fazer") {
    courses = getFazerCourses(variables.lang);
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

const changelang = () => {
  if (variables.lang === "fi") {
    variables.lang = "en";
  } else {
    variables.lang = "fi";
  }

  const lang = variables.lang;
  const uifi = variables.uifi;
  const uien = variables.uien;

  variables.link1.textContent = eval("ui" + lang + ".link1");
  variables.link2.textContent = eval("ui" + lang + ".link2");
  variables.link3.textContent = eval("ui" + lang + ".link3");
  variables.link4.textContent = eval("ui" + lang + ".link4");
  variables.p1.textContent = eval("ui" + lang + ".p1");
  variables.p2.textContent = eval("ui" + lang + ".p2");
  variables.langButton.textContent = eval("ui" + lang + ".langButton");
  variables.dropRestaurant.textContent = eval("ui" + lang + ".dropRestaurant");
  variables.dropSort.textContent = eval("ui" + lang + ".dropSort");
  variables.dropFilter.textContent = eval("ui" + lang + ".dropFilter");
  variables.nameAscButton.textContent = eval("ui" + lang + ".nameAscButton");
  variables.nameDescButton.textContent = eval("ui" + lang + ".nameDescButton");
  variables.priceAscButton.textContent = eval("ui" + lang + ".priceAscButton");
  variables.priceDescButton.textContent = eval(
    "ui" + lang + ".priceDescButton"
  );
  variables.filterPriceButton.textContent = eval("ui" + lang + ".filterPrice");
  variables.filterVegButton.textContent = eval("ui" + lang + ".filterVeg");
  variables.randomButton.textContent = eval("ui" + lang + ".randomButton");
  variables.menuPrice.textContent = eval("ui" + lang + ".menuPrice");

  if (variables.restaurant === "sodexo") {
    menuPriceCalc(getSodexoCourses(lang));
    renderCards(sortCourses(variables.sort, getSodexoCourses(lang)));
  }
  if (variables.restaurant === "fazer") {
    renderCards(sortCourses(variables.sort, getFazerCourses(lang)));
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
      renderCards(getSodexoCourses(variables.lang));
      variables.restaurant = "sodexo";
    }
    if (child.value === "fazer") {
      renderCards(getFazerCourses(variables.lang));
      variables.restaurant = "fazer";
    }
  });
});

variables.sortButtons.forEach((child) => {
  child.addEventListener("click", () => {
    if (variables.restaurant === "sodexo") {
      renderCards(sortCourses(child.value, getSodexoCourses(variables.lang)));
    }
    if (variables.restaurant === "fazer") {
      renderCards(sortCourses(child.value, getFazerCourses(variables.lang)));
    }
  });
});

variables.filterButtons.forEach((child) => {
  child.addEventListener("click", () => {
    if (variables.restaurant === "sodexo") {
      renderCards(filterCourses(child.value, getSodexoCourses(variables.lang)));
    }
    if (variables.restaurant === "fazer") {
      renderCards(filterCourses(child.value, getFazerCourses(variables.lang)));
    }
  });
});

variables.randomButton.addEventListener("click", () => {
  let courses = [];
  if (variables.restaurant === "sodexo") {
    courses = getSodexoCourses(variables.lang);
  }
  if (variables.restaurant === "fazer") {
    courses = getFazerCourses(variables.lang);
  }
  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  variables.modal.classList.remove("hidden");
  renderModal(randomCourse);
});

variables.closeButton.addEventListener("click", () => {
  variables.modal.classList.add("hidden");
});

variables.langButton.addEventListener("click", changelang);

raisePrices();

menuPriceCalc();

renderCards(getSodexoCourses("fi"));
