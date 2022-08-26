import "./settings.css";
import {useContext, useEffect, useState} from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import Orders from "../../components/orders/Orders";

export default function Settings() {

  const [success, setSuccess] = useState(false);
  const { user, dispatch, update } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    let updatedUser = {
      userId: user._id,
      username,
      email,
    };
    if(password){
      updatedUser = {
        ...updatedUser,
        password
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  useEffect(() => {
    window.scrollTo({
      top: 300,
      behavior: "smooth"
    })
  }, [update])


  return (
      <div style={{ marginTop: 80}}>
        <TopBar/>
        <div>
        <div style={{fontSize: 30, marginLeft: 40, marginTop: 20, marginBottom: -60}}>Заказы</div>
          <div>
          {
            user?.orderId?.length < 2 ?
                <div style={{justifyContent: 'center', display: 'flex', height: 222}}>
                <div>
                <div style={{width: 300, textAlign: 'center', fontSize: 30, marginTop: 100}}>
                  У вас нет заказов
                </div>

                <div className="btn" style={{width: 200, marginLeft: 50}} onClick={()=>window.location.replace("/")}>
                  Заказать пиццу
                </div>
                </div>

                  </div>
                :
            <Orders/>
          }
        </div>

</div>


    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Личные данные</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>

          <label>Имя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Обновить
          </button>
          <button className="settingsSubmit" style={{backgroundColor: 'gray'}} onClick={handleLogout}>Выйти</button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Профиль обновлен...
            </span>
          )}
        </form>


      </div>
    </div>
      </div>
  );
}
