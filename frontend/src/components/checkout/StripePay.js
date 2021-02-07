import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardPicker from "./CardPicker";
import { setAlert } from "../../redux/actions/alertActions";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  singleCharge,
  saveCardAndCharge,
  chargeSavedCard,
} from "../../redux/actions/stripeActions";
import { setCard } from "../../redux/actions/userActions";

const StripePay = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const { cardToUse, user } = useSelector((state) => state.userReducer);
  const { stripeId, coursesOwned } = user;
  const [saveCard, setSaveCard] = useState(false);
  const [useSavedCard, setUseSavedCard] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const { total } = useSelector((state) => state.cartReducer);

  const description = "Purchase From <BLANK> Store";

  // CLASSES

  const saveCardClass = saveCard ? "radio radio--fill" : "radio";
  const useSavedCardClass = useSavedCard ? "radio radio--fill" : "radio";

  const saveCardClick = () => {
    if (!saveCard) setUseSavedCard(false);
    setSaveCard(!saveCard);
  };

  const displayCardsClick = () => {
    if (!useSavedCard) setSaveCard(false);
    dispatch(setCard({}));
    setUseSavedCard(!useSavedCard);
  };

  const resetCard = (obj) => {
    dispatch(setCard(obj));
  };

  const submitToken = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    try {
      const { token } = await stripe.createToken(cardElement);
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user._id) {
      dispatch(
        setAlert("Please loggin or create an account to complete your order")
      );
      return;
    }
    let duplicate = [];
    for (let i = 0; i < coursesOwned.length; i++) {
      if (cart.some((el) => el._id === coursesOwned[i]._id)) {
        console.log(coursesOwned[i]._id);
        duplicate = [...duplicate, coursesOwned[i].title];
      }
    }
    if (duplicate.length) {
      let message = duplicate.length > 1 ? "these courses" : "this course";

      dispatch(
        setAlert(
          `You already own ${duplicate.join(
            ", "
          )}, please remove ${message} from your cart`
        )
      );
      return;
    }
    if (cardToUse.id) {
      dispatch(
        chargeSavedCard(cardToUse.id, total, description, cart, stripeId)
      );
      return;
    }
    let token = await submitToken();
    if (!token) {
      dispatch(setAlert("Payment cannot be submitted"));
      return;
    }
    if (!saveCard) {
      dispatch(singleCharge(token, total, description, cart));
      return;
    }
    if (saveCard) {
      dispatch(saveCardAndCharge(token, total, description, cart, stripeId));
      return;
    }
  };

  let returner = (
    <form className="stripe-pay" onSubmit={handleSubmit}>
      <div className="stripe-pay__title">Checkout</div>
      <div className="stripe-pay__grid">
        <div className="stripe-pay__row">
          {useSavedCard && cardToUse.id ? (
            <div
              className="stripe-pay__card-picked"
              onClick={() => resetCard({})}
            >
              <div className="card-picker__list--brand">{cardToUse.brand}</div>
              <div className="card-picker__list--last4">{cardToUse.last4}</div>
            </div>
          ) : (
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    "::placeholder": {
                      color: "#aab7c4",
                      fontFamily: "sans-sarif",
                    },
                  },
                  invalid: {
                    color: "#e9327c",
                  },
                },
              }}
            />
          )}
        </div>
      </div>
      <div className="stripe-pay__row stripe-pay__row-radio">
        <div className={useSavedCardClass} onClick={() => displayCardsClick()}>
          use saved card
        </div>
        <div className={saveCardClass} onClick={() => saveCardClick()}>
          save card
        </div>
      </div>
      <div className="stripe-pay__row">
        <button className="stripe-pay__button" disabled={!stripe}>
          Pay
        </button>
      </div>
    </form>
  );

  if (useSavedCard && !cardToUse.id)
    returner = <CardPicker cancel={setUseSavedCard} />;

  return <Fragment>{returner}</Fragment>;
};

export default StripePay;
