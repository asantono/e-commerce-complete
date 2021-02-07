import React, { useState } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteCourse,
  editCourseData,
  resetCourseData,
} from "../../redux/actions/courseActions";
import { setUserCourse } from "../../redux/actions/userActions";

const TeachCourses = () => {
  const { coursesCreated } = useSelector((state) => state.userReducer.user);
  const [showWarning, setShowWarning] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();
  let list = null;

  const goToTeachers = () => {
    dispatch(resetCourseData());
    history.push("/teachers");
  };

  const editCourse = (e, el) => {
    e.stopPropagation();
    dispatch(editCourseData(el));
    history.push("/teachers");
  };

  const deleteWarning = (e, _id) => {
    e.stopPropagation();
    setShowWarning(_id);
  };

  const deleteChoice = (choice) => {
    if (choice) {
      dispatch(deleteCourse(showWarning));
      setShowWarning("");
    } else setShowWarning("");
  };

  const loadCourse = (el) => {
    dispatch(setUserCourse(el));
    history.push("/product");
  };

  if (coursesCreated.length > 0) {
    list = coursesCreated.map((el) => (
      <div
        className="teach-courses__list"
        key={el._id}
        onClick={() => loadCourse(el)}
      >
        <div className="teach-courses__list--left">
          <div className="teach-courses__list--left--title">{el.title}</div>
        </div>
        <div className="teach-courses__list--right">
          <input
            className="teach-courses__list--right--edit"
            type="submit"
            value="edit"
            onClick={(e) => editCourse(e, el)}
          />
          <input
            className="teach-courses__list--right--delete"
            type="submit"
            value="delete"
            onClick={(e) => deleteWarning(e, el._id)}
          />
        </div>
      </div>
    ));
  }

  const deleteDialogue = (
    <div className="teach-courses__delete-dialogue">
      <div className="teach-courses__delete-dialogue--top">Delete Course?</div>
      <div className="teach-courses__delete-dialogue--bottom">
        <div className="teach-courses__delete-dialogue--bottom--left">
          <input
            className="teach-courses__list--right--delete"
            type="submit"
            value="Delete"
            onClick={() => deleteChoice(true)}
          />
        </div>
        <div className="teach-courses__delete-dialogue--bottom--right">
          <input
            className="teach-courses__list--right--edit"
            type="submit"
            value="Cancel"
            onClick={() => deleteChoice(false)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {showWarning ? <div>{deleteDialogue}</div> : null}
      <div className="teach-courses">
        <input
          className="teach-courses__create"
          type="submit"
          value="Create A New Course"
          onClick={() => goToTeachers()}
        />
        <div className="teach-courses__title">Created Courses</div>
        <div className="teach-courses__list-container">{list}</div>
      </div>
    </Fragment>
  );
};

export default TeachCourses;
