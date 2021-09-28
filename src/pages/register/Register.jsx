import { useRef } from "react";
import axios from "axios";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      passwordConfirm.current.setCustomValidity("Password does not match!");
    } else {
      const userRegister = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", userRegister);
        history.push("/login");
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
              type="email"
            />
            <input
              placeholder="Password"
              className="loginInput"
              ref={password}
              type="password"
              required
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              ref={passwordConfirm}
              type="password"
              required
            />
            <button type="submit" className="loginButton">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
