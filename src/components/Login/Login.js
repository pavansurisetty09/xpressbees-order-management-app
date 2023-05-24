import React, { useEffect } from "react";
import { Form, Input, Checkbox, Button, Alert } from "antd";
import "./Login.css";
import { users } from "../../data/userData";
import { useNavigate } from "react-router-dom";
import { authenticateUser, errorMessage } from "../../actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.authentication.isUserAuthenticated
  );

  const validationErrorMessage = useSelector(
    (state) => state.authentication.err
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/orders");
    } else {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onFinish = (values) => {
    const matchedUser = users.find(
      (user) =>
        user.username.toLowerCase() === values.username.toLowerCase() &&
        user.password === values.password
    );
    if (matchedUser) {
      dispatch(errorMessage(""));
      message.success("Login successful!");
      if (values.remember) {
        localStorage.setItem("loggedInUser", true);
      } else {
        localStorage.clear();
      }
    } else {
      message.error("Login failed!");
      dispatch(errorMessage("Invalid username or password."));
    }
    dispatch(authenticateUser(matchedUser));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleValuesChange = () => {
    dispatch(errorMessage(""));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://res.cloudinary.com/drenxtuen/image/upload/v1684583816/Tablet_login-cuate_mvgg1m.svg"
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleValuesChange}
        >
          <div className="login-logo">
            <img
              src="https://asset.brandfetch.io/id3Wnmm8UV/idOb6gK97V.png"
              alt="xpressbees-login-logo"
              width="60px"
            />
          </div>
          <p className="form-title">Xpressbees Order Management</p>
          <p>Login to the Dashboard</p>
          {validationErrorMessage && (
            <Alert message={validationErrorMessage} type="error" showIcon />
          )}
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
