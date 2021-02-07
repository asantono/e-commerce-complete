import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useWindowSize from "../../customHooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";
import { setUserCourse } from "../../redux/actions/userActions";
import { getAllCourses } from "../../redux/actions/courseActions";
import defaultImg from "../../imgs/defaultImg.jpg";

const CourseSlider = () => {
  const [courseCount, setCourseCount] = useState(0);
  const [courseSliderAnimate, setCourseSliderAnimate] = useState(
    "course-slider__courses"
  );

  const [images, setImages] = useState(["default"]);

  const { courses, sale } = useSelector((state) => state.courseReducer);

  const { cart } = useSelector((state) => state.cartReducer);
  let history = useHistory();

  const cartAdd = (e, item) => {
    e.stopPropagation();
    dispatch(addToCart(cart, item, sale));
  };

  const goToProduct = (el) => {
    if (el._id === 999999999999) {
      history.push("/allcourses");
      return;
    }
    dispatch(setUserCourse(el));
    history.push("/product");
  };

  const { width } = useWindowSize();

  let showCourses = 3;
  if (width <= 596) showCourses = 2;

  let courseCopy = [...courses];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (courseCopy.length > 0) {
    courseCopy.push({
      title: "See More Courses",
      price: " varies",
      author: "our authors",
      img: { url: require("../../imgs/books.jpg"), deleteKey: "" },
      position: 999999999999,
      _id: 999999999999,
    });
  }

  const changeCourseCountBack = (e) => {
    e.stopPropagation();
    setImages(["default"]);
    setCourseSliderAnimate(
      "course-slider__courses course-slider__slideout-right"
    );
    setTimeout(() => {
      setCourseCount(courseCount - showCourses);
      setCourseSliderAnimate(
        "course-slider__courses course-slider__slidein-right"
      );
    }, 150);
  };

  const changeCourseCountForward = (e) => {
    e.stopPropagation();
    setImages(["default"]);
    setCourseSliderAnimate("course-slider__courses course-slider__slideout");
    setTimeout(() => {
      setCourseCount(courseCount + showCourses);
      setCourseSliderAnimate("course-slider__courses course-slider__slidein");
    }, 150);
  };

  const courseList = courseCopy.map((el) => (
    <div
      key={el._id}
      className="course-slider__course"
      onClick={() => goToProduct(el)}
    >
      <img
        id={images.includes(el.img.url) ? `show` : `hide`}
        className="course-slider__course--img"
        src={el.img.url === "default" ? defaultImg : el.img.url}
        alt={el.name}
        onLoad={() => {
          setImages([...images, el.img.url]);
        }}
        onError={() => {
          setImages([...images, el.img.url]);
        }}
      />
      <div className="course-slider__course--bottom">
        <div className="course-slider__course--bottom--title">{el.title}</div>
        <div className="course-slider__course--bottom--author">
          by: {el.author}
        </div>

        {el.saleOptIn && sale ? (
          <div className="course-slider__course--bottom--price">
            <span className="course-slider__course--bottom--strike">
              ${el.price.toFixed(2)}
            </span>
            Sale ${(el.price * sale).toFixed(2)}
          </div>
        ) : (
          <div className="course-slider__course--bottom--price">
            ${el.price}
          </div>
        )}
        {el.position === 999999999999 ? (
          <div />
        ) : (
          <input
            className="course-slider__course--bottom--button"
            type="submit"
            value="add to cart"
            onClick={(e) => cartAdd(e, el)}
          />
        )}
      </div>
    </div>
  ));

  let activeList = [];
  showCourses === 3
    ? (activeList = [
        courseList[courseCount],
        courseList[courseCount + 1],
        courseList[courseCount + 2],
      ])
    : (activeList = [courseList[courseCount], courseList[courseCount + 1]]);

  return (
    <div className="course-slider">
      <div className="course-slider__title">Top Courses</div>
      <div className="course-slider__underline" />
      <div className="course-slider__container">
        {courseCount === 0 ? (
          <div />
        ) : (
          <div
            className="course-slider__course--back"
            onClick={(e) => changeCourseCountBack(e)}
          >
            <FaArrowLeft />
          </div>
        )}
        <div className={courseSliderAnimate}>{activeList}</div>
        {courseCount + showCourses >= courseCopy.length ? (
          <div />
        ) : (
          <div
            className="course-slider__course--forward"
            onClick={(e) => changeCourseCountForward(e)}
          >
            <FaArrowRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSlider;
