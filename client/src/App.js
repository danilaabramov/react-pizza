import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "./context/Context";
import Orders from "./components/orders/Orders";
import Analytics from "./pages/Analytics/Analytics";
import TopBar from "./components/topbar/TopBar";
import PostDetails from "./components/postDetails/PostDetails";
import X from "./pages/home/X";
import Basket from "./components/order/Basket";
import Delivery from "./components/Delivery/Delivery";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import axios from "axios";
import anime from "animejs";

function App() {


    const {user, update, update2, update3, dispatch, delivery, showBasket} = useContext(Context);
    const [v, setV] = useState(false)
    const [v2, setV2] = useState(false)
    const [products, setProducts] = useState(0)
    const popupRef = useRef(null)


    useEffect(async () => {
        try {
            const res = await axios.get("/orders/" + user.orderId[user.orderId.length - 1])
            let products = res.data.products
            setProducts(products)
        } catch (e) {
            try {
                let res = await axios.post("/orders", {username: user.username})
                let products = res.data.products
                setProducts(products)
                dispatch({type: "UPDATE_START"});
                let userUp = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    orderId: [
                        res.data._id
                    ]
                }
                try {
                    res = await axios.put("/users/" + user._id, userUp)
                    dispatch({type: "UPDATE_SUCCESS", payload: {...res.data}})
                } catch (err) {
                    dispatch({type: "UPDATE_FAILURE"});
                    console.log(err)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }, [update, update2])

    function Anime() {
        anime({
            targets: '.basket',
            width: 430,
            duration: 100,
            easing: 'easeInOutSine'
        });
    }

    function Anime2() {
        anime({
            targets: '.basket',
            width: 0,
            duration: 100,
            easing: 'easeInOutSine'
        });
    }

    useEffect(async () => {
        if (showBasket) {
            setV(true)
            Anime()
        } else {
            setV(false)
            Anime2()
        }
    }, [showBasket])

    const closeDialog = () => {
        dispatch({type: "UPDATE3", payload: null})
        dispatch({type: "SHOWBASKET", payload: false})
    }

    useEffect(() => {
        setV2(true)
    }, [delivery])

    const closeDialog2 = () => {
        setV2(false)
        dispatch({type: "DELIVERY", payload: null})
    }

    useEffect(() => {
        if (v || update3) popupRef.current && disableBodyScroll(popupRef.current)
        else popupRef.current && enableBodyScroll(popupRef.current)
    }, [v, update3])


    return (
        <div ref={popupRef}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/register">{user ? <Home/> : <Register/>}</Route>
                        <Route path="/login">{user ? <Home/> : <Login/>}</Route>

                        <Route path="/write">{user ? <> {user.username === 'admin' ? <Write/> : <Home/>} </> :
                            <Login/>}</Route>
                        <Route path="/list-orders">{user ? <> {user.username === 'admin' ? <><TopBar/><Orders
                            wrap={true}/></> : <Home/>} </> : <Login/>}</Route>
                        <Route path="/analytics">{user ? <> {user.username === 'admin' ? <Analytics/> : <Home/>} </> :
                            <Login/>}</Route>
                        <Route path="/settings">{user ? <Settings/> : <Login/>}</Route>
                        <Route path="/pizza/:postId">
                            <Single/>
                        </Route>
                    </Switch>
                </div>
            </Router>


            {
                (v || update3) &&
                <div onClick={closeDialog} style={{
                    opacity: .5, position: 'fixed', overflowY: 'scroll',
                    height: '100%', right: 0, width: '100%', zIndex: 1000, backgroundColor: 'black', color: 'black',
                    top: 0
                }}>
                </div>
            }

            {update3 && <PostDetails closeDialog={closeDialog} products={products} flag={update3}/>}

            {
                v &&
                <div style={{
                    position: 'fixed', top: 'calc(50% - 12.5px)',
                    right: 450, width: 25, zIndex: 2000, cursor: 'pointer'
                }}
                     onClick={closeDialog}>
                    <X/>
                </div>
            }

            <div className="basket" style={{
                width: 0, position: 'fixed', overflowX: 'hidden', overflowY: 'scroll',
                height: '100%', right: 0, zIndex: 1000, backgroundColor: 'white', top: 0
            }}>
                <Basket closeDialog={closeDialog}/>
            </div>

            {
                delivery && v2 &&
                <div onClick={closeDialog2} style={{
                    opacity: .5, position: 'fixed', overflowY: 'scroll',
                    height: '100%', right: 0, width: '100%', zIndex: 2000, backgroundColor: 'black', color: 'black',
                    top: 0
                }}>
                </div>
            }

            {
                delivery && v2 &&
                <Delivery close={closeDialog2}/>
            }


        </div>
    );
}

export default App;
