import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  adminGetUser,
  createSale,
  orderDetails,
} from "../../redux/actions/adminActions";
import { getSale } from "../../redux/actions/courseActions";
import { setAlert } from "../../redux/actions/alertActions";

const Admin = () => {
  const { user } = useSelector((state) => state.adminReducer);
  const { sale } = useSelector((state) => state.courseReducer);
  const { clearance } = useSelector((state) => state.userReducer.user);
  const { orders } = user;

  useEffect(() => {
    dispatch(getSale());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [query, setQuery] = useState("");
  const [saleNum, setSaleNum] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const makeQuery = (e) => {
    setQuery(e.target.value);
  };

  const submitQuery = (e) => {
    e.preventDefault();
    dispatch(adminGetUser(query));
  };

  const saleChange = (e) => {
    setSaleNum(e.target.value);
  };

  const submitSale = (e) => {
    e.preventDefault();
    if (!saleNum || saleNum > 1) {
      dispatch(setAlert("Sale Numbers must be between 0 and 1"));
    }
    dispatch(createSale(saleNum));
  };

  const showOrder = (el) => {
    dispatch(orderDetails(el));
    history.push("/adminorder");
  };

  let ordersList = [];
  if (orders) {
    ordersList = orders
      .sort((a, b) => b[0].date - a[0].date)
      .map((el) => (
        <div
          className="admin__order"
          key={el[0].date}
          onClick={() => {
            showOrder(el);
          }}
        >
          <div className="admin__order--left">
            <div className="admin__order--date">
              {moment(el[0].date).format("MM/DD/YYYY, HH:mm")}
            </div>
          </div>
          <div className="admin__order--right">
            <div className="admin__order--titles">
              {el.map((order) => (
                <div className="admin__order--titles--title">{order.title}</div>
              ))}
            </div>
          </div>
        </div>
      ));
  }

  const denied = (
    <div className="forgot-password__title">
      You do not have the required permissions to view this page
    </div>
  );

  return (
    <Fragment>
      {clearance !== "admin" ? (
        denied
      ) : (
        <div className="admin">
          <div className="admin__title">User Search</div>
          <form
            className="admin__form"
            onSubmit={(e) => {
              submitQuery(e);
            }}
          >
            <input
              className="search"
              type="text"
              placeholder="username"
              onChange={(e) => makeQuery(e)}
            />
          </form>
          <div className="admin__results--title">User Info</div>
          <div className="admin__results">
            <div>email: {user.email}</div>
            <div>stripe ID: {user.stripeId}</div>
            <div>clearance: {user.clearance}</div>
          </div>
          <div className="admin__results--title">Orders</div>
          <div className="admin__orders-container">{ordersList}</div>
          <div className="admin__results--title">Sale Update</div>
          <form className="admin__sale" onSubmit={(e) => submitSale(e)}>
            <input
              type="input"
              className="admin__sale--input"
              placeholder="ex: 0.2 = 80% off"
              onChange={(e) => saleChange(e)}
            />
            <div className="admin__sale--current">current sale: {sale}</div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Admin;
