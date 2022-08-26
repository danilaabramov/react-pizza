import "./basket.css";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context/Context";
import axios from "axios";
import zero from './order-zero.png'
import {AiOutlineRight} from "react-icons/ai";
import Product from "./Product";
import {GiTwoCoins} from "react-icons/gi";
import Switch from "./Switch";

export default function Basket({closeDialog}) {
    const {user, dispatch, update, showBasket} = useContext(Context);
    const [quantity, setQuantity] = useState(0);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState();
    const [price, setPrice] = useState(0);
    const [isToggled, setIsToggled] = useState(false)
    const [userData, setUserData] = useState()

    useEffect(async () => {
        setIsToggled(false)
    }, [showBasket])

    useEffect(async () => {
        try {
            let products
            const res = await axios.get("/orders/" + user.orderId[user.orderId.length - 1])
            //if (res.data.status !== 'Собирается') return
            console.log(res.data)
            const data = res.data
            setOrder(data)
            setProducts(data.products)
            products = data.products

            let q = 0, p = 0

            for (let i = 0; i < products.length; ++i) {
                const res = await axios.get("/pizzas/" + products[i]._id)
                q += products[i].quantity
                p += res.data.price[products[i].desc.sizeNum] * products[i].quantity
            }
            setQuantity(q)
            setPrice(p)

        } catch (e) {
            console.log(e)
        }
    }, [update])


    const toggle = async () => {
        let userData = await axios.get("/users/" + user._id);
        setIsToggled(t => userData.data?.coins ? !t : t)
        setUserData(userData.data)
    }


    const handleSubmit = async () => {
        let coins = !isToggled ? Number((price * 0.05).toFixed(0)) : price < userData?.coins ? -price : -userData?.coins
        dispatch({
            type: "DELIVERY", payload: {
                ...order,
                coins
            }
        })
    };

    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        setInterval(() => {
            setWidth(window.innerWidth)
        }, 0.1)
    })

    const handleUpdate = async (up, i) => {
        let p = products
        let id = p[i]._id
        let size = p[i].desc.sizeNum
        p[i].quantity += up
        if (p[i].quantity < 1) p.splice(i, 1)
        const res = await axios.get("/pizzas/" + id)
        setPrice(p => p + res.data.price[size] * up)
        setQuantity(q => q + up)
        let updatedOrder = {products: [...p]};
        setProducts(p)
        try {
            await axios.put("/orders/" + user.orderId[user.orderId.length - 1], updatedOrder);
        } catch (err) {
        }
        dispatch({type: "UPDATE2"})
    };

    function declOfNum(number) {
        return [' товар', ' товара', ' товаров'][(number % 100 > 4 && number % 100 < 20) ?
            2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }

    return (
        <div className="basket"
             style={{marginLeft: width < 430 ? 430 - width : 0}}>
            {user && products.map((post, index) => (
                <div style={{width: width < 430 ? width - 32 : 398}} className="basketProduct" key={index}>
                    <Product post={post} handleUpdate={handleUpdate} index={index}/>
                </div>
            ))
            }

            {
                user && products.length !== 0 ?
                    <div style={{
                        boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                        padding: '0 16px',
                        height: `calc(100vh - ${products.length} * 157.992px)`,
                        minHeight: 280,
                        width: width < 430 ? width - 32 : 398
                    }}>
                        <div>
                            <p style={{
                                marginBottom: 16, height: 20, fontSize: 14, paddingTop: 16,
                                lineHeight: '20px',
                                fontFamily: 'sans-serif',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div>{quantity + declOfNum(quantity)}</div>
                                <div>{price} ₽</div>
                            </p>
                            <p style={{
                                marginBottom: 16, height: 20, fontSize: 14,
                                lineHeight: '20px',
                                fontFamily: 'sans-serif',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div>Потратить коины</div>
                                <div style={{display: 'flex'}}>
                                    <Switch rounded={true} isToggled={isToggled} onToggle={toggle}/>
                                </div>
                            </p>


                            <p style={{
                                marginBottom: 16, height: 20, fontSize: 14,
                                lineHeight: '20px',
                                fontFamily: 'sans-serif',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                {
                                    isToggled ? <div>Будет списано</div>
                                        :
                                        <div>Начислим коины</div>

                                }
                                <div style={{display: 'flex'}}>
                                    {
                                        !isToggled ? Number((price * 0.05).toFixed(0)) : price < userData?.coins ? price : userData?.coins
                                    }
                                    <div style={{
                                        background: 'linear-gradient(93deg, rgba(156,17,217,1) 0%, rgba(217,18,18,1) 53%, rgba(219,112,14,1) 100%)',
                                        width: 18,
                                        height: 18,
                                        borderRadius: 20,
                                        padding: 2,
                                        marginLeft: 5
                                    }}>
                                        <GiTwoCoins color={'white'} size={18}/>
                                    </div>
                                </div>
                            </p>
                            <hr/>
                            <p style={{
                                margin: '16px 0', height: 18, fontSize: 18,
                                lineHeight: '18px',
                                fontWeight: 500,
                                fontFamily: 'sans-serif',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <div>Сумма заказа</div>
                                <div>{price - (!isToggled ? 0 : price < userData?.coins ? price : userData?.coins)} ₽</div>
                            </p>
                        </div>
                        <div
                            className="btnBasket"
                            style={{
                                display: "flex", userSelect: 'none', cursor: 'pointer', margin: "auto",
                                width: width < 430 ? width - 32 : 398, height: 48
                            }}
                            onClick={handleSubmit}>
                            <div style={{margin: "auto", display: 'flex', marginTop: 7}}>
                                К оформлению заказа
                                <div style={{
                                    position: 'relative',
                                    left: width < 430 ? 90 - (430 - width) / 2 : 90,
                                    top: 5
                                }}>
                                    <AiOutlineRight size={20}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100vh',
                        width: width < 430 ? width : 430,
                        userSelect: 'none'
                    }}>
                        <img src={zero} alt="" style={{width: 200 / 509 * 800, height: 200}}/>
                        <div style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'sans-serif', marginTop: 20}}>
                            Ой, пусто!
                        </div>
                        <div style={{
                            width: 270,
                            fontSize: 14,
                            fontFamily: 'sans-serif',
                            lineHeight: 1.5,
                            marginTop: 20,
                            textAlign: 'center'
                        }}>
                            Ваша корзина пуста, откройте «Меню»
                            и выберите понравившийся товар.
                        </div>
                    </div>
            }
        </div>
    );
}
