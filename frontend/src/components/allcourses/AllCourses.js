import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserCourse } from "../../redux/actions/userActions";
import { loadMoreCourses } from "../../redux/actions/courseActions";

const AllCourses = () => {
  const { courses } = useSelector((state) => state.courseReducer);
  const [pageNum, setPageNum] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadMoreCourses(pageNum));
    setPageNum(pageNum + 1);
    return () => {
      setPageNum(0);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goToProduct = (el) => {
    dispatch(setUserCourse(el));
    history.push("/product");
  };

  const loadMore = () => {
    dispatch(loadMoreCourses(pageNum));
    setPageNum(pageNum + 1);
  };

  const courseList = courses.map((el) => (
    <div
      className="result-box__course"
      key={el._id}
      onClick={() => goToProduct(el)}
    >
      <div className="result-box__course--left">
        <div className="result-box__course--left--title">{el.title}</div>
        <div className="result-box__course--left--author">
          author: {el.author}
        </div>
      </div>
      <div className="result-box__course--right">
        <div className="result-box__course--right--adText">{el.adText}</div>
      </div>
    </div>
  ));
  return (
    <div className="all-courses">
      <div className="all-courses__title">Course List</div>
      <div className="course-slider__underline" />
      {courseList}
      <input
        className="all-courses__load"
        type="submit"
        value="load more"
        onClick={() => loadMore()}
      />
    </div>
  );
};

export default AllCourses;
