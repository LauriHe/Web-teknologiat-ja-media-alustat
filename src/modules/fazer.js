import { doFetch } from "./network";

const getFazerCourses = async (lang) => {
  let fazerCoursesfi = [];
  let fazerCoursesen = [];

  const MenuFi = await doFetch(
    "https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=fi",
    true
  );
  Object.entries(MenuFi.MenusForDays[0].SetMenus).forEach((menu) => {
    fazerCoursesfi.push(menu[1]);
  });
  const MenuEn = await doFetch(
    "https://www.compass-group.fi/menuapi/feed/json?costNumber=3208&language=en",
    true
  );
  Object.entries(MenuEn.MenusForDays[0].SetMenus).forEach((menu) => {
    fazerCoursesen.push(menu[1]);
  });

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
