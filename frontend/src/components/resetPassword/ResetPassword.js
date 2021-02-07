import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { passwordReset, getHash } from "../../redux/actions/userActions";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { hash } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  let historyArray;
  useEffect(() => {
    historyArray = history.location.pathname.split("/");
    dispatch(getHash(historyArray[historyArray.length - 1]));
    history.replace("/resetpassword");
  }, []);

  const pwChange = (e) => {
    setPassword(e.target.value);
  };

  const resetPassword = (e) => {
    e.preventDefault();
    dispatch(passwordReset(password, hash));
  };

  return (
    <form className="forgot-password" onSubmit={(e) => resetPassword(e)}>
      <div className="forgot-password__title">Password Reset</div>
      <div className="forgot-password__subtitle">Enter a new password</div>
      <input
        className="search"
        type="password"
        placeholder="new password"
        onChange={(e) => pwChange(e)}
      />
      <input
        className="forgot-password__button"
        type="submit"
        value="reset password"
      />
    </form>
  );
};

export default ResetPassword;
