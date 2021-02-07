import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../redux/actions/alertActions";
import { refundStripeCharge } from "../../redux/actions/stripeActions";

const OrderRefund = (props) => {
  const { stripeOrder } = props;
  const { id } = stripeOrder;
  const dispatch = useDispatch();

  const [refund, setRefund] = useState(0.0);
  let formatRefund;
  const refundChange = (e) => {
    setRefund(e.target.value);
  };

  const submitRefund = (e) => {
    e.preventDefault();
    if (refund <= 0) {
      dispatch(setAlert("Refunds must have a price"));
      return;
    }
    formatRefund = Math.floor(refund * 100);
    if (formatRefund > stripeOrder.amount - stripeOrder.amount_refunded) {
      dispatch(
        setAlert(
          "The refund amount is greater than the amount paid minus the amount already refunded"
        )
      );
    }
    dispatch(refundStripeCharge(id, formatRefund));
  };

  return (
    <div className="order-refund">
      <div className="admin__title admin-order__remove-margin">
        Issue Refund
      </div>
      <form className="order-refund__form" onSubmit={(e) => submitRefund(e)}>
        <input
          className="order-refund__form--input"
          type="num"
          placeholder="refund amount"
          value={refund}
          onChange={(e) => refundChange(e)}
        />
        <input
          className="order-refund__form--button"
          type="submit"
          value="issue refund"
        />
      </form>
    </div>
  );
};

export default OrderRefund;
