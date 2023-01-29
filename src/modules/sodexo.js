import lunchMenu from "./sodexo.json";
let sodexoCourses = [];
Object.entries(lunchMenu.courses).forEach((course) => {
  sodexoCourses.push(course.pop());
});

const getSodexoCourses = (lang) => {
  const courses = [];
  if (lang === "en") {
    sodexoCourses.forEach((sodexoCourse) => {
      const name = sodexoCourse.title_en;
      const properties = sodexoCourse.properties;
      const price = sodexoCourse.price;

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
      const price = sodexoCourse.price;

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
