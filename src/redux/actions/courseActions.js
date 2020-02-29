import * as types from "./actionTypes";

export function createCourse(course) {
  console.log("In action  creator");
  return { type: types.CREATE_COURSE, course }; // instead of course: course we can just send course as left and right params match. This is called object short hand syntax
}
