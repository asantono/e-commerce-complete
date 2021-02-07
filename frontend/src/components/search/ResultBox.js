import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useClickOutsideComponent from "../../customHooks/useClickOutsideComponent";
import { clearSearchCourses } from "../../redux/actions/courseActions";
import { setUserCourse } from "../../redux/actions/userActions";

const ResultBox = () => {
  const { searchedCourses } = useSelector((state) => state.courseReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useClickOutsideComponent(true);

  useEffect(() => {
    if (searchedCourses.length < 0) return;
    if (!isComponentVisible) {
      dispatch(clearSearchCourses());
      setIsComponentVisible(true);
    }
  }, [isComponentVisible]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToProduct = (el) => {
    if (el._id === 999999999999) {
      history.push("/allcourses");
      return;
    }
    dispatch(setUserCourse(el));
    dispatch(clearSearchCourses());
    history.push("/product");
  };

  // classes

  const resultBox = searchedCourses.length
    ? "result-box"
    : "result-box result-box__opacity";

  const courseList = searchedCourses.map((el) => (
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
    <div className={resultBox} ref={ref}>
      <div className="result-box__container">{courseList}</div>
    </div>
  );
};

export default ResultBox;
