import lunchMenu from "./sodexo.json";
let sodexoCourses = [];
Object.entries(lunchMenu.courses).forEach((course) => {
  sodexoCourses.push(course.pop());
});

import variables from "./mainVariables";

const menuPriceCalc = () => {
  variables.menuPrice.textContent +=
    " " + sodexoCourses.reduce((a, b) => a + parseFloat(b.price), 0) + " €";
};

const raisePrices = () => {
  sodexoCourses = sodexoCourses.map((course) => {
    return {
      title_fi: course.title_fi,
      title_en: course.title_en,
      category: course.category,
      properties: course.properties,
      price: (course.price * 1.15).toFixed(2),
    };
  });
};

const sortCourses = (sort) => {
  if (sort === "nameAsc") {
    const sortedCourses = sodexoCourses.sort((a, b) => {
      if (
        eval("a.title_" + variables.lang) < eval("b.title_" + variables.lang)
      ) {
        return -1;
      }
    });
    sort = "nameAsc";
    return sortedCourses;
  }
  if (sort === "namedesc") {
    const sortedCourses = sodexoCourses.sort((a, b) => {
      if (
        eval("a.title_" + variables.lang) > eval("b.title_" + variables.lang)
      ) {
        return -1;
      }
    });
    sort = "namedesc";
    return sortedCourses;
  }
  if (sort === "priceAsc") {
    const sortedCourses = sodexoCourses.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      }
    });
    sort = "priceAsc";
    return sortedCourses;
  }
  if (sort === "priceDesc") {
    const sortedCourses = sodexoCourses.sort((a, b) => {
      if (a.price > b.price) {
        return -1;
      }
    });
    sort = "priceDesc";
    return sortedCourses;
  }
  return sodexoCourses;
};

const filterCourses = (filter) => {
  if (filter === "price") {
    const filteredCourses = sodexoCourses.filter((course) => course.price < 5);
    return filteredCourses;
  }
  if (filter === "veg") {
    const filteredCourses = sodexoCourses.filter((course) =>
      course.properties.includes("Veg")
    );
    return filteredCourses;
  }
};

const renderCards = (courses) => {
  variables.mainCards.innerHTML = "";

  courses.forEach((course) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = eval("course.title_" + variables.lang);

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
    variables.mainCards.appendChild(card);
  });
};

const renderModal = (course) => {
  variables.modalContent.textContent = "";

  const title = document.createElement("h3");
  title.textContent = eval("course.title_" + variables.lang);

  const category = document.createElement("p");
  category.textContent = course.category;

  const properties = document.createElement("p");
  properties.textContent = course.properties;

  const price = document.createElement("p");
  price.textContent = course.price;

  variables.modalContent.appendChild(title);
  variables.modalContent.appendChild(category);
  variables.modalContent.appendChild(properties);
  variables.modalContent.appendChild(price);
};

const sodexoFunctions = {
  menuPriceCalc,
  raisePrices,
  sortCourses,
  filterCourses,
  renderCards,
  renderModal,
};

export default sodexoFunctions;
