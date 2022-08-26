import {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import logo from './pizza.png'
import $ from 'jquery'
import { useLocation } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import {FiShoppingCart} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function TopBar() {
    const location = useLocation();
    const { user, dispatch, update, update2 } = useContext(Context);
    const [width, setWidth] = useState(window.innerWidth)
    const [flag, setFlag] = useState(false)
    const [quantity, setQuantity] = useState()

    useEffect(async () => {
            try {
                const res = await axios.get("/orders/" + user.orderId[user.orderId.length - 1])
                let products = res.data.products
                let q = 0
                for (let i = 0; i < products.length; ++i) q += products[i].quantity
                if (q !== quantity) setQuantity(q)
            } catch (e) {
            }
        },
        [update, update2, user])

    useEffect( async() => {
        if(user) {
            let userData = await axios.get("/users/" + user._id);
            dispatch({type: "LOGIN_SUCCESS", payload: userData.data})
        }
    }, [])

    useEffect(() => {
        setInterval(() => {
            setWidth(window.innerWidth)
        }, 0.1)
    })

    useEffect(() => {
        if(width > 912) {
            $("body").removeClass('active');
            setFlag(false)
        }
    }, [width])

    useEffect(() => {
            $("body").removeClass('active');
            setFlag(false)
    }, [location])


    const toggle = () => {
        if(flag) {
            $("body").removeClass('active')
            setFlag(false)
        } else {
            $("body").addClass('active');
            setFlag(true)
        }
    }

    const showDialog = () => {
        dispatch({type: "SHOWBASKET", payload: true})
    }


  return (
    <div className="top" style={{height: flag ? '100vh' : 60, backgroundColor: flag ? 'rgba(255, 255, 255, 1)' :
                'rgba(255, 255, 255, .8)', transitionDuration: '1s'}}>

      <div className="topLeft" style={{justifyContent: width > 912 ? 'center' : 'start'}}>

          <div className="topList">
            {
                /*width > 912 ?*/
                <Link className="link" to="/" style={{display: 'flex', marginBottom: 10}}>
                    <img style={{width: 40, height: 40, marginTop: 5, marginRight: 8, marginLeft: 20}} src={logo}
                         alt=""/>
                    <div>
                        <div style={{fontWeight: 'bold', marginTop: 10}}> Mondo Pizza</div>
                        <div style={{fontSize: 10}}> Лучшая пицца во вселенной</div>
                    </div>
                </Link>
                  /*  :

                        <Link className="link" to="/" style={{display: 'flex', marginTop: 5}}>
                            <img style={{width: 40, height: 40, marginTop: 5}} src={logo} alt=""/>
                        </Link>
                    */
            }
          </div>

      </div>
        {
            width > 912 &&
      <div className="topCenter">

                  <ul className="topList" style={{marginTop: 19}}>
                      {
                          user?.username === "admin" &&
                          <li className="topListItem">
                              <Link className="link l-main" to="/write">
                                  Добавить
                              </Link>
                          </li>
                      }
                      {
                          user?.username === "admin" &&
                          <li className="topListItem">
                              <Link className="link l-main" to="/list-orders">
                                  Заказы
                              </Link>
                          </li>
                      }
                      {
                          user?.username === "admin" &&
                          <li className="topListItem">
                              <Link className="link l-main" to="/analytics">
                                  Аналитика
                              </Link>
                          </li>
                      }
                  </ul>

      </div>
        }
          {
              width > 912 ?
                  <div className="topRight">

                      {

                          user ?
                              <ul className="topList" style={{marginTop: 10}}>

                              <li className="topListItem" >
                                  <div style={{background: 'linear-gradient(45deg, rgba(17,39,217,1) 0%, rgba(156,17,217,1) 20%, rgba(193,18,182,1) 40%, rgba(217,18,18,1) 60%, rgba(219,112,14,1) 80%, rgba(235,238,13,1) 100%)', borderRadius: 20, padding: '5px 8px'}}>
                                        <div style={{display: 'flex'}}><GiTwoCoins color={'white'} size={30}/>
                                            <div style={{color: 'white', marginTop: 5, marginLeft: 5}}>{user.coins} </div> </div>
                                  </div>
                              </li>

                                  <li className="topListItem btnHome" onClick={showDialog} >
                                      <div style={{display: 'flex', justifyContent: 'center'}}>
                                          <div style={{marginTop: 3}}><FiShoppingCart size={20}/></div>
                                          {quantity > 0 && <div style={{border: '.1px solid white', margin: '0 8px 5px'}}/>}
                                          <div style={{overflow: 'hidden', fontSize: 20 }}>{quantity > 0 && quantity}</div>
                                      </div>
                                  </li>
                                  <li className="topListItem">
                                    <Link to="/settings">
                                       <FaUserCircle size={40} color={'black'}/>
                                    </Link>
                                  </li>
                              </ul>
                              :
                              <ul className="topList" style={{marginTop: 15}}>
                                  <li className="topListItem">
                                      <Link className="link" to="/login">
                                          Войти
                                      </Link>
                                  </li>
                              </ul>
                      }

                  </div>
                  :
                  <div className="topRight" style={{justifyContent: 'end'}}>
                  <ul className="topList" style={{marginTop: 10}}>
                  <li className="topListItem btnHome" onClick={showDialog} >
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                          <div style={{marginTop: 3}}><FiShoppingCart size={20}/></div>
                          {quantity > 0 && <div style={{border: '.1px solid white', margin: '0 8px 5px'}}/>}
                          <div style={{overflow: 'hidden', fontSize: 20 }}>{quantity > 0 && quantity}</div>
                      </div>
                  </li>
                      <li className="topListItem">
                          <div onClick={toggle} style={{marginTop: 5, marginRight: 15}}>
                              <AiOutlineMenu size={30}/>
                          </div>
              </li></ul></div>

          }



            <ul className="topList" style={{marginTop: 100, position: 'absolute', display: 'flex', justifyContent: 'center',
            visibility: flag ? "visible" : 'hidden', transitionDelay: '.2s', width: '100%', textAlign: 'center'}}>
                <div>
                        {
                            user ?
                                <>
                                <li className="topListItem"  style={{margin: '0 0 20px'}}>
                                <div className="link" style={{fontSize: 25, display: 'flex', justifyContent: 'center'}}>

                                    <div>
                                    Коины
                                </div>
                                    <div style={{background: 'linear-gradient(93deg, rgba(156,17,217,1) 0%, rgba(217,18,18,1) 53%, rgba(219,112,14,1) 100%)', borderRadius: 20, padding: 3, marginLeft: 5, color: 'white', fontSize: 19, minWidth: 25}}>
                                        {user.coins}
                                    </div>
                                </div>
                                </li>
                                <li className="topListItem"  style={{margin: '0 0 20px'}}>
                                    <Link className="link" to="/settings" style={{fontSize: 25}}>
                                        Профиль
                                    </Link>
                                </li>
                                </>
                                :
                                    <li className="topListItem"  style={{margin: '0 0 20px'}}>
                                        <Link className="link" to="/login" style={{fontSize: 25}}>
                                            Войти
                                        </Link>
                                    </li>
                        }
                    {
                        user?.username === "admin" &&
                        <div>
                            <li className="topListItem" style={{margin: '0 0 20px'}}>
                                <Link className="link" to="/write" style={{fontSize: 25}}>
                                    Добавить
                                </Link>
                            </li>
                            <li className="topListItem" style={{margin: '0 0 20px'}}>
                                <Link className="link" to="/list-orders" style={{fontSize: 25}}>
                                    Заказы
                                </Link>
                            </li>
                            <li className="topListItem" style={{margin: 0}}>
                                <Link className="link" to="/analytics" style={{fontSize: 25}}>
                                    Аналитика
                                </Link>
                            </li>
                        </div>
                    }
                </div>
            </ul>
    </div>
  );
}
