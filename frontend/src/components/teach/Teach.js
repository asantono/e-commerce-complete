import React from "react";
import DropZone from "./DropZone";
import { useDispatch, useSelector } from "react-redux";
import {
  sendCourseData,
  setCourseData,
  setCourseRadio,
  setCourseFeatures,
} from "../../redux/actions/courseActions";
import { Fragment } from "react";

const Teach = () => {
  const {
    saleOptIn,
    title,
    author,
    price,
    length,
    accessType,
    certification,
    tagline,
    adText,
    features,
    _id,
  } = useSelector((state) => state.courseReducer.courseData);

  const { clearance } = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(setCourseData(name, value));
  };

  const featureChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCourseFeatures(name, value));
  };

  const changeRadio = () => {
    let radioVal = true;
    if (saleOptIn === true) radioVal = false;
    dispatch(setCourseRadio(radioVal));
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(
      sendCourseData(
        {
          saleOptIn,
          title,
          author,
          price,
          length,
          accessType,
          certification,
          tagline,
          adText,
          features,
          _id,
        },
        { edit: _id ? true : false }
      )
    );
  };

  const denied = (
    <div className="forgot-password__title">
      Please sign up or login to create a course
    </div>
  );

  return (
    <Fragment>
      {!clearance ? (
        denied
      ) : (
        <form className="teach" onSubmit={(e) => submitForm(e)}>
          <div className="teach__title">Create Your Course</div>
          <DropZone />

          <div className="teach__questions">
            <div className="teach__row">
              <div className="teach__text">Course Title: </div>
              <input
                className="teach__input"
                name="title"
                onChange={(e) => handleChange(e)}
                placeholder="course title"
                value={title}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Author: </div>
              <input
                className="teach__input"
                name="author"
                placeholder="author"
                onChange={(e) => handleChange(e)}
                value={author}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Price: </div>
              <input
                className="teach__input"
                type="number"
                min="0"
                step="1"
                name="price"
                placeholder="price"
                onChange={(e) => handleChange(e)}
                value={price}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Course length: </div>
              <input
                className="teach__input"
                name="length"
                placeholder="in hours"
                onChange={(e) => handleChange(e)}
                value={length}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Certification: </div>
              <input
                className="teach__input"
                name="certification"
                placeholder="certification type"
                onChange={(e) => handleChange(e)}
                value={certification}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Join Sales: </div>
              <input
                type="radio"
                name="saleOptIn"
                onClick={() => changeRadio()}
                onChange={() => `just to clear the error code`}
                checked={saleOptIn}
                className="teach__input teach__input--radio"
                placeholder="author"
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Tagline: </div>
              <textarea
                className="teach__input-area"
                name="tagline"
                placeholder="a sentence or two describing the course"
                onChange={(e) => handleChange(e)}
                value={tagline}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Ad Text: </div>
              <textarea
                className="teach__input-area"
                name="adText"
                placeholder="a few sentences advertising the course"
                onChange={(e) => handleChange(e)}
                value={adText}
                required
              />
            </div>

            <div className="teach__row">
              <div className="teach__text">Features: </div>
              <div className="teach__features">
                <input
                  className="teach__input"
                  placeholder="feature one"
                  name={0}
                  onChange={(e) => featureChange(e)}
                  value={features[0]}
                  required
                />
                <input
                  className="teach__input"
                  placeholder="feature two"
                  name={1}
                  onChange={(e) => featureChange(e)}
                  value={features[1]}
                  required
                />
                <input
                  className="teach__input"
                  placeholder="feature three"
                  name={2}
                  onChange={(e) => featureChange(e)}
                  value={features[2]}
                  required
                />
                <input
                  className="teach__input"
                  placeholder="feature four"
                  name={3}
                  onChange={(e) => featureChange(e)}
                  value={features[3]}
                  required
                />
                <input
                  className="teach__input"
                  placeholder="feature five"
                  name={4}
                  onChange={(e) => featureChange(e)}
                  value={features[4]}
                  required
                />
                <input
                  className="teach__input"
                  placeholder="feature six"
                  name={5}
                  onChange={(e) => featureChange(e)}
                  value={features[5]}
                  required
                />
              </div>
            </div>

            <div className="teach__row">
              <div className="teach__text">Student access: </div>
              <select
                className="teach__input--select"
                name="accessType"
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="lifetime access">lifetime access</option>
                <option value="semester end">semester end</option>
              </select>
            </div>
          </div>
          <input className="teach__button" value="submit" type="submit" />
        </form>
      )}
    </Fragment>
  );
};

export default Teach;
