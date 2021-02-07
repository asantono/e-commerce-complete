import React from "react";
import { withRouter } from "react-router-dom";
import { setUserCourse } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const CtaTop = (props) => {
  const { courses } = useSelector((state) => state.courseReducer);

  let title = "",
    tagline = "",
    adText = "",
    img = "";
  if (courses[0]) {
    title = courses[0].title;
    tagline = courses[0].tagline;
    adText = courses[0].adText;
    img = courses[0].img.url;
  }

  const dispatch = useDispatch();

  const navProduct = (userCourse) => {
    dispatch(setUserCourse(userCourse));
    props.history.push("/product");
  };

  return (
    <div className="cta-top">
      <div className="cta-top__overlay">
        <img className="cta-top__overlay--img" src={img} alt={title} />
      </div>
      <div className="cta-top__textbox">
        <div className="cta-top__textbox--headline">{title}</div>
        <div className="cta-top__textbox--story">{tagline}</div>
        <div className="cta-top__textbox--story">{adText}</div>
        <input
          className="cta-top__textbox--button"
          type="submit"
          value={`Learn ${title}`}
          onClick={() => navProduct(courses[0])}
        />
      </div>
    </div>
  );
};

export default withRouter(CtaTop);
