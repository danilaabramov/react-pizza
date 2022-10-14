import axios from "axios";
import { useState } from "react";
import "./register.css";
import TopBar from "../../components/topbar/TopBar";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const reg = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      reg.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
      <>
        <TopBar />
        <div className="register">
          <span className="registerTitle">Регистрация</span>
          <form className="registerForm" onSubmit={handleSubmit}>
            <label>Имя</label>
            <input
                type="text"
                className="registerInput"
                placeholder="Введите Ваше имя..."
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
                type="text"
                className="registerInput"
                placeholder="Введите Ваш email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Пароль</label>
            <input
                type="password"
                className="registerInput"
                placeholder="Введите Ваш пароль..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" type="submit">
              Зарегистрироваться
            </button>
          </form>
          {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
      </>
  );
}
