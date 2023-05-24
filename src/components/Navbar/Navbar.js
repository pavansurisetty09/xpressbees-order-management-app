import "./Navbar.css";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../actions/AuthAction";
import { message } from "antd";

const Navbar = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/");
  };

  const handleLogOut = () => {
    dispatch(authenticateUser(!isAuthenticated));
    localStorage.clear();
    message.success("Logout successful!");
  };

  return (
    <nav id="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <a href="#home">
            <i className=""></i>
            <img
              src="https://asset.brandfetch.io/id3Wnmm8UV/idotNJr0kv.png"
              alt="Logo"
            />
          </a>
        </div>
        <ul id="menu">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div
          className="login"
          onClick={isAuthenticated ? handleLogOut : handleLogIn}
        >
          <h4>
            {isAuthenticated ? <LoginOutlined /> : <LogoutOutlined />}
            &nbsp;&nbsp;
            {isAuthenticated ? "Logout" : "Login"}
          </h4>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
