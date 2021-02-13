import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Product from "./pages/Product";
import "./styles/main.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Alert from "./components/alert/Alert";
import ShoppingCart from "./pages/ShoppingCart";
import OwnedCourses from "./pages/OwnedCourses";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ActiveCourse from "./pages/ActiveCourse";
import Teachers from "./pages/Teachers";
import TeachHome from "./pages/TeachHome";
import AdminPanel from "./pages/AdminPanel";
import AdminOrderPage from "./pages/AdminOrderPage";
import AllCoursesPage from "./pages/AllCoursesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadScreen from "./components/load/LoadScreen";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const stripePromise = loadStripe(
    "pk_test_f40hadtOBUc7xHciDxHF1R8x00VpO3OS3y"
  );
  return (
    <Provider store={store}>
      <LoadScreen />
      <Router>
        <Header />
        <div className="page-container">
          <Alert />
          <Elements stripe={stripePromise}>
            <Switch>
              <Route exact path="/auth">
                <Auth />
              </Route>
              <Route exact path="/product">
                <Product />
              </Route>

              <Route exact path="/cart">
                <ShoppingCart />
              </Route>

              <Route exact path="/OwnedCourses">
                <OwnedCourses />
              </Route>

              <Route exact path="/activeCourse">
                <ActiveCourse />
              </Route>
              <Route exact path="/allcourses">
                <AllCoursesPage />
              </Route>
              <Route exact path="/teachers">
                <Teachers />
              </Route>
              <Route exact path="/teacherhome">
                <TeachHome />
              </Route>

              <Route exact path="/admin">
                <AdminPanel />
              </Route>
              <Route exact path="/adminorder">
                <AdminOrderPage />
              </Route>

              <Route exact path="/contact">
                <ContactPage />
              </Route>
              <Route exact path="/About">
                <AboutPage />
              </Route>
              <Route exact path="/forgotpassword">
                <ForgotPasswordPage />
              </Route>
              <Route exact path="/resetPassword/:hash">
                <ResetPasswordPage />
              </Route>
              <Route exact path="/resetPassword">
                <ResetPasswordPage />
              </Route>
              <Route exact path="/">
                <Landing />
              </Route>
            </Switch>
          </Elements>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
