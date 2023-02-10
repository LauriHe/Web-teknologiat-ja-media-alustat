/**
 * Get Sodexo courses
 *
 * @module sodexo
 */

/**
 * Takes the daily menu from Sodexo API and returns a formated array of courses
 *
 * @param {string} lang - Desired language
 * @returns Array of courses
 */

import { doFetch } from "./network";

const getSodexoCourses = async (lang) => {
  // Get the current date
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  if (month < 10) {
    month = "0" + month;
  }

  // Array to store the courses
  let sodexoCourses = [];

  // Fetch the daily menu from Sodexo API
  const dailyMenu = await doFetch(
    `https://www.sodexo.fi/ruokalistat/output/daily_json/152/${year}-${month}-${day}`
  );
  // Push the courses to the array
  Object.entries(dailyMenu.courses).forEach((course) => {
    sodexoCourses.push(course.pop());
  });

  // Array to store the formated courses
  const courses = [];
  if (lang === "en") {
    // Loop through courses and format them
    sodexoCourses.forEach((sodexoCourse) => {
      // Store the needed data
      const name = sodexoCourse.title_en;
      const properties = sodexoCourse.properties;
      const price = sodexoCourse.price.split("€")[0].replace(",", ".");

      // Create a course object and use the stored data
      const course = {
        name: name,
        properties: properties,
        price: price,
      };

      // Push the course to the array
      courses.push(course);
    });
    return courses;
  } else {
    // Same as above but with Finnish data
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
