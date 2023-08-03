import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import OrderManagement from "./components/orders/OrderManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { authenticateUser } from "./actions/AuthAction";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-65MWCL2D9W";
ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isUserAuthenticated
  );

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: "Home Page",
    });
  }, []);

  useEffect(() => {
    const isUserAuthenticated = localStorage.getItem("loggedInUser");
    if (isUserAuthenticated) {
      dispatch(authenticateUser(true));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
