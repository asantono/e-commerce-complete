import { setAlert } from "./alertActions";
import { UPDATE_CART } from "../types";

const cartTotal = (cart, sale) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].saleOptIn) total += cart[i].price * sale;
    else total += cart[i].price;
  }
  return total;
};

export const addToCart = (cart, item, sale) => (dispatch) => {
  item.sale = sale;
  if (cart.some((el) => el._id === item._id)) {
    dispatch(setAlert("This course is already in your cart"));
    return;
  }
  const newCart = [...cart, item];
  const newTotal = cartTotal(newCart, sale);
  dispatch({ type: UPDATE_CART, payload: { cart: newCart, total: newTotal } });
  dispatch(setAlert("Added to cart", 3000));
};

export const removeFromCart = (cart, item, sale) => (dispatch) => {
  const newCart = cart.filter((el) => el._id !== item._id);
  const newTotal = cartTotal(newCart, sale);
  dispatch({ type: UPDATE_CART, payload: { cart: newCart, total: newTotal } });
};
