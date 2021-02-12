import React from "react";
import useScrollTracker from "../../customHooks/useScrollTracker";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import defaultImg from "../../imgs/defaultImg.jpg";

const ProductFixed = () => {
  const { userCourse } = useSelector((state) => state.userReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const { sale } = useSelector((state) => state.courseReducer);
  const {
    title,
    img,
    price,
    saleOptIn,
    length,
    accessType,
    certification,
  } = userCourse;

  let currentPrice = 0;
  currentPrice = saleOptIn && sale ? (price * sale).toFixed(2) : price;

  const dispatch = useDispatch();

  const addClick = (userCourse) => {
    dispatch(addToCart(cart, userCourse, sale));
  };

  const {
    tooClose,
    scrollY,
    windowHeight,
    documentHeight,
    windowWidth,
  } = useScrollTracker(90);

  // Classes
  const fixedClass =
    tooClose && scrollY > 30
      ? "product-cta__buynow product-cta__buynow--offset"
      : "product-cta__buynow";

  const image = img.url;

  return (
    <div className={fixedClass}>
      <img
        className="product-cta__buynow--top"
        src={image === "default" ? defaultImg : image}
        alt="top img"
      />
      <div className="product-cta__buynow--bottom">
        <div className="product-cta__buynow--bottom--price">
          ${currentPrice}
          {saleOptIn && sale ? (
            <span className="product-cta__buynow--bottom--price--slash">
              ${price}
            </span>
          ) : null}
        </div>
        <input
          className="product-cta__buynow--bottom--addtocart"
          type="submit"
          value="add to cart"
          disabled={!title}
          onClick={() => {
            addClick(userCourse);
          }}
        />
        <div className="product-cta__buynow--bottom--points">
          <strong>
            <u>course includes:</u>
          </strong>
          <div className="product-cta__buynow--bottom--points--medium">
            <li>length: {length}</li>
            <li>access: {accessType}</li>
            <li>certification: {certification}</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFixed;
