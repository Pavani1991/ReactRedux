import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
// BIND ACTION CREATORS HELP US FROM calling the action creat ort  directorly in the mapDispatchToProps function
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  // can simplify this using shorter approach
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     course: {
  //       title: ""
  //     }
  //   };

  //   //this.handleChange = this.handleChange.bind(this)
  // }
  // this is the simplified version creating a constructor, calling super props and setting this.state
  // state = {
  //   course: {
  //     title: ""
  //   }
  // };
  // handleChange = event => {
  //   // arrow binding do not have this key word. So, this binding will associate this to the class instance.
  //   // This is a better approach than binding the event in the change value in input/ binding the function in the property
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };

  // handleSubmit = event => {
  //   // const course = { ...this.state.course, title: event.target.value };
  //   // this.setState({ course });
  //   event.preventDefault();

  //   console.log("In submit method");
  //   this.props.actions.createCourse(this.state.course);
  // };
  // adding onSubmit handler on the form is better than adding action handler in save, because when user clikcs enter forms submit sctions gets submited insead of user clicking in button
  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <h2> Courses</h2>
  //       <h3> Add Course</h3>
  //       <input
  //         type="text"
  //         onChange={this.handleChange} //onChange={this.handleChange.bind(this)}
  //         value={this.state.course.title}
  //       />
  //       <input type="submit" value="Save" />
  //       {this.props.courses.map(course => (
  //         <div key={course.title}>{course.title}</div>
  //       ))}
  //     </form>
  //   );
  // }
  state = {
    redirectToAddCoursePage: false
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      // adding this to not make network requests even once the component is loaded
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading Authors failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2> Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  console.log("In map state");
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id == course.authorId).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  console.log("In dispatch props");
  return {
    // bindActionCreators will either accepth a function or an object.
    // you can pass all the action as seen below or a single action
    // when all the actions are passed then it return then all wrapped
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), // this will wrap all the course action in the dispatch
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
    // createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

// WHen we declare mapDispatchToProps as object instead of function, then each proprty is expected to be in actioncreator function(which is courseAction.createCourse action is)
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage); // connection function will take input parameters, whihc returns a function and calling coursesPage
