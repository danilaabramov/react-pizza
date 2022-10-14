import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";
import TopBar from "../../components/topbar/TopBar";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
      <>
        <TopBar />
    <div className="login">
      <span className="loginTitle">Вход</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Имя</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Введите Ваше имя..."
          ref={userRef}
        />
        <label>Пароль</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Введите Ваш пароль..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Войти
        </button>
      </form>
      <Link className="link" to="/register">
      <button className="loginRegisterButton" style={{marginTop: 15}}>
          Зарегистрироваться
      </button>
      </Link>
    </div>
        </>
  );
}
