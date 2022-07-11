import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import * as authorActions from "../redux/actions/authorActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteCourse.bind(this);
  }
  state = {
    redirectToAddCourse: false,
  };
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      console.log("erroes ==>", error);
      alert("Loading courses failed", error);
    });

    this.props.actions.loadAuthors().catch((error) => {
      alert("Loading authors failed", error);
    });
  }

  handleDeleteCourse = async (course) => {
    toast.success("Course Deleted!");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete Failed " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCourse && <Redirect to="/course" />}
        <h1>Courses</h1>
        {this.props.loading > 0 ? (
          <Spinner />
        ) : (
          <>
            <button
              className="btn btn-primary add-course"
              style={{ marginBottom: 10 }}
              onClick={() => this.setState({ redirectToAddCourse: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />{" "}
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: propTypes.array.isRequired,
  courses: propTypes.array.isRequired,
  actions: propTypes.object.isRequired,
  loading: propTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
