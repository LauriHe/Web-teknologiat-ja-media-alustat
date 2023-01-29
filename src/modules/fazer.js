import fazerfi from "./fazerFi.json";
let fazerCoursesfi = [];
Object.entries(fazerfi.MenusForDays[0].SetMenus).forEach((menu) => {
  fazerCoursesfi.push(menu[1]);
});

import fazeren from "./fazerEn.json";
let fazerCoursesen = [];
Object.entries(fazeren.MenusForDays[0].SetMenus).forEach((menu) => {
  fazerCoursesen.push(menu[1]);
});

const getFazerCourses = (lang) => {
  const courses = [];
  if (lang === "en") {
    for (let i = 0; i < fazerCoursesen.length; i++) {
      const name = fazerCoursesen[i].Components[0].split(" (")[0];
      const properties = "(" + fazerCoursesen[i].Components[0].split(" (")[1];
      let price = fazerCoursesfi[i].Price.split("/")[0].replace(",", ".");

      const course = {
        name: name,
        properties: properties,
        price: price,
      };

      courses.push(course);
    }
    return courses;
  } else {
    fazerCoursesfi.forEach((fazerCourse) => {
      const name = fazerCourse.Components[0].split(" (")[0];
      const properties = "(" + fazerCourse.Components[0].split(" (")[1];
      const price = fazerCourse.Price.split("/")[0].replace(",", ".");

      const course = {
        name: name,
        properties: properties,
        price: price,
      };

      courses.push(course);
    });
    return courses;
  }
};

export default getFazerCourses;
