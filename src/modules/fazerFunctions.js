import variables from "./mainVariables";

const renderCards = (menus) => {
  variables.mainCards.innerHTML = "";

  menus.forEach((menu) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const title = document.createElement("h3");
    title.textContent = menu.Components;

    const price = document.createElement("p");
    price.textContent = menu.Price;

    card.appendChild(title);
    card.appendChild(price);
    variables.mainCards.appendChild(card);
  });
};

const fazerFunctions = { renderCards };

export default fazerFunctions;
