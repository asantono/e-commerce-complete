import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const resetPw = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <form className="forgot-password" onSubmit={(e) => resetPw(e)}>
      <div className="forgot-password__title">Password Reset</div>
      <div className="forgot-password__subtitle">Enter your email</div>
      <input
        className="search"
        type="email"
        placeholder="email"
        onChange={(e) => emailChange(e)}
      />
      <input
        className="forgot-password__button"
        type="submit"
        value="reset password"
      />
    </form>
  );
};

export default ForgotPassword;
