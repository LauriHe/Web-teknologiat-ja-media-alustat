import { doFetch } from "./network";

const getSodexoCourses = async (lang) => {
  let sodexoCourses = [];

  const dailyMenu = await doFetch(
    "https://www.sodexo.fi/ruokalistat/output/daily_json/152/2023-01-30"
  );
  Object.entries(dailyMenu.courses).forEach((course) => {
    sodexoCourses.push(course.pop());
  });

  const courses = [];
  if (lang === "en") {
    sodexoCourses.forEach((sodexoCourse) => {
      const name = sodexoCourse.title_en;
      const properties = sodexoCourse.properties;
      const price = sodexoCourse.price.split("€")[0].replace(",", ".");

      const course = {
        name: name,
        properties: properties,
        price: price,
      };

      courses.push(course);
    });
    return courses;
  } else {
    sodexoCourses.forEach((sodexoCourse) => {
      const name = sodexoCourse.title_fi;
      const properties = sodexoCourse.properties;
      const price = sodexoCourse.price.split("€")[0].replace(",", ".");

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

export default getSodexoCourses;
