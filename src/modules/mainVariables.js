const link1 = document.querySelector("#link1");
const link2 = document.querySelector("#link2");
const link3 = document.querySelector("#link3");
const link4 = document.querySelector("#link4");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");
const langButton = document.querySelector("#langButton");
const listsortButton = document.querySelector("#listsortButton");
const restaurantContent = document.querySelector(".restaurantContent");
const sortContent = document.querySelector(".sortContent");
const filterContent = document.querySelector(".filterContent");
const restaurantButtons = Array.from(restaurantContent.children);
const sortButtons = Array.from(sortContent.children);
const filterButtons = Array.from(filterContent.children);
const mainCards = document.querySelector("#mainCards");
const dropbtn = document.querySelector(".dropbtn");
const randomButton = document.querySelector("#randomButton");
const menuPrice = document.querySelector("#menuPrice");
const closeButton = document.querySelector("#closeButton");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modalContent");

let lang = "fi";
let sort = "";
let restaurant = "sodexo";

const variables = {
  link1,
  link2,
  link3,
  link4,
  p1,
  p2,
  langButton,
  listsortButton,
  sortContent,
  filterContent,
  restaurantButtons,
  sortButtons,
  filterButtons,
  mainCards,
  dropbtn,
  randomButton,
  menuPrice,
  closeButton,
  modal,
  modalContent,
  lang,
  sort,
  restaurant,
};

export default variables;
