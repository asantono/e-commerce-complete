import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStripeCharge } from "../../redux/actions/stripeActions";
import OrderRefund from "./OrderRefund";

const AdminOrder = () => {
  const { orderDetails, stripeOrder } = useSelector(
    (state) => state.adminReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderDetails[0]) {
      dispatch(getStripeCharge(orderDetails[0].chargeId));
    }
  }, [orderDetails]); // eslint-disable-line react-hooks/exhaustive-deps

  const orderList = orderDetails.map((el) => (
    <div className="admin-order__order" key={el._id}>
      <div className="admin-order__order--row">title: {el.title}</div>
      <div className="admin-order__order--row">Access: {el.accessType}</div>
      <div className="admin-order__order--row">author: {el.author}</div>
      <div className="admin-order__order--row">
        price: {el.price.toFixed(2)}
      </div>
      <div className="admin-order__order--row">sale: {el.sale}</div>
      <div className="admin-order__order--row">
        price paid: {el.saleOptIn ? (el.sale * el.price).toFixed(2) : el.price}
      </div>
      <div className="admin-order__order--row">
        saleOptIn: {el.saleOptIn ? "Yes" : "No"}
      </div>
      <div className="admin-order__order--row">chargeId: {el.chargeId}</div>
    </div>
  ));
  return (
    <div className="admin-order">
      <div className="admin__title">Order Details</div>
      <div className="admin-order__container">{orderList}</div>
      <div className="admin__title admin-order__remove-margin">
        Payment Details
      </div>
      <div className="admin-order__order admin-order__add-margin--three">
        <div className="admin-order__order--row">
          Price Paid: {(stripeOrder.amount / 100).toFixed(2)}
        </div>
        <div className="admin-order__order--row">
          Amount Refunded: {(stripeOrder.amount_refunded / 100).toFixed(2)}
        </div>
      </div>
      <OrderRefund stripeOrder={stripeOrder} />
    </div>
  );
};

export default AdminOrder;
