import "./orders.css";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context/Context";
import axios from "axios";
import {useLocation} from "react-router";
import TopBar from "../topbar/TopBar";
import Order from "./Order";

export default function Orders({wrap}) {

  const [orders, setOrders] = useState([]);
    const { user, dispatch } = useContext(Context);

  useEffect(async () => {
      const res = await axios.get("/orders");
      setOrders(res.data.reverse());
      dispatch({ type: "UPDATE" })
  }, []);





  return (
      <div>
          <div className="list-orders" style={{flexWrap: wrap ? 'wrap' : '', justifyContent: wrap ? 'center' : '',
              overflow: 'scroll', alignItems: 'flex-start', paddingLeft: wrap ? 0 : 20}}>
          {
              user && orders.map((order, i) => (
                  <div key={i}>
                    {
                        order.status !== 'Собирается' &&
                        (user.username === 'admin' || user.username === order.username) &&
                        <Order order={order}/>
                    }
                  </div>
              ))
          }
        </div>
      </div>
  )
}
