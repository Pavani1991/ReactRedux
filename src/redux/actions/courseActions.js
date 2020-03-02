import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  console.log("In action  creator");
  return { type: types.CREATE_COURSE, course }; // instead of course: course we can just send course as left and right params match. This is called object short hand syntax
}

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  return function(dispatch) {
    // this syntax is important as it will be utilized by thunk middleware. Middleware passes dispatch down to the thnk
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateCourseSuccess(course) {
  console.log("in update course success");
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  console.log("in create course success");
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    // this syntax is important as it will be utilized by thunk middleware. Middleware passes dispatch down to the thnk
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
