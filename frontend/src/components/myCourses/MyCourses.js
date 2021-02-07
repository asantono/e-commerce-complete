import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserCourse } from "../../redux/actions/userActions";
import defaultImg from "../../imgs/defaultImg.jpg";

const MyCourses = () => {
  const { coursesOwned } = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  let history = useHistory();

  const goToCourse = (el) => {
    dispatch(setUserCourse(el));
    history.push("/activecourse");
  };

  let coursesList = "No Courses Found";
  if (coursesOwned.length > 0)
    coursesList = coursesOwned.map((el) => (
      <div
        className="my-courses__course"
        key={el._id}
        onClick={() => goToCourse(el)}
      >
        <img
          className="my-courses__image"
          src={el.img.url === "default" ? defaultImg : el.img.url}
          alt="not found"
        />
        <div className="my-courses__name-description">
          <div className="my-courses__name">{el.title}</div>
          <div className="my-courses__author">{el.author}</div>
          <div className="my-courses__description">{el.tagline}</div>
        </div>
      </div>
    ));
  return (
    <div className="my-courses">
      <div className="my-courses__title">Owned Courses</div>
      <div className="my-courses__course-container">{coursesList}</div>
    </div>
  );
};

export default MyCourses;
