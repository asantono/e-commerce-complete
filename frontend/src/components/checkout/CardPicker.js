import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteCard } from "../../redux/actions/stripeActions";
import { setCard } from "../../redux/actions/userActions";

const CardPicker = (props) => {
  const { cards, user } = useSelector((state) => state.userReducer);
  const { stripeId } = user;
  const dispatch = useDispatch();
  const deleteCardPressed = (id) => {
    dispatch(deleteCard(id, stripeId));
  };

  const chooseCard = (card) => {
    dispatch(setCard(card));
  };

  const { cancel } = props;

  const cardList = cards.map((el) => (
    <div className="card-picker__list" key={el.id}>
      <div
        className="card-picker__list--container"
        onClick={() => chooseCard(el)}
      >
        <div className="card-picker__list--brand">{el.brand}</div>
        <div className="card-picker__list--last4">{el.last4}</div>
      </div>
      <div
        className="card-picker__list--remove"
        onClick={() => deleteCardPressed(el.id)}
      >
        <TiDeleteOutline />
      </div>
    </div>
  ));
  return (
    <div className="stripe-pay">
      <div className="stripe-pay__title">Choose A Saved Card</div>
      <div className="card-picker__padding" />
      {cardList}
      <div className="card-picker__padding--small" />
      <div className="card-picker__padding--small" />
      <input
        className="stripe-pay__button"
        type="submit"
        value="cancel"
        onClick={() => cancel(false)}
      />
      <div className="card-picker__padding--small" />
    </div>
  );
};

export default CardPicker;
