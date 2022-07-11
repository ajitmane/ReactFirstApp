import React from "react";
import { connect } from "react-redux";
import * as authorActions from "../redux/actions/authorActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorList from "./AuthorList";

class AuthorsPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadAuthors().catch((error) => {
      alert("Loading courses failed", error);
    });
  }
  render() {
    return (
      <>
        <h1>Authors</h1>
        <AuthorList authors={this.props.authors} />
      </>
    );
  }
}

AuthorsPage.propTypes = {
  authors: propTypes.array.isRequired,
  actions: propTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch),
  };
}

// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
