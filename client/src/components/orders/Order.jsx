import "./orders.css";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductOrder from "./ProductOrder";
import ProductOrder2 from "./ProductOrder2";

export default function Order({order}) {

    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [flag, setFlag] = useState(false)
    const [status, setStatus] = useState('')

    useEffect(async () => {
        let p = 0
        for (let i = 0; i < order.products.length; ++i) {
            const res = await axios.get("/pizzas/" + order.products[i]._id);
            p += res.data.price[order.products[i].desc.sizeNum] * order.products[i].quantity
        }
        setPrice(p + (order.coins < 0 ? order.coins : 0))
        let q = 0
        for (let i = 0; i < order.products.length; ++i) q += order.products[i].quantity
        setQuantity(q)
        setStatus(order.status)
    }, []);


    const handleUpdate = async () => {
        try {
            await axios.put(`/orders/${order._id}`, {
                status: status === 'Принят' ? 'Выполнен' : 'Принят'
            });
            setStatus(status === 'Принят' ? 'Выполнен' : 'Принят')
            console.log(status === 'Принят' ? 'Выполнен' : 'Принят')
        } catch (err) {
            console.log(err)
        }
    };


    function declOfNum(number) {
        return [' товар', ' товара', ' товаров'][(number % 100 > 4 && number % 100 < 20) ?
            2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }

    return (
        <div className="order"
             style={{fontFamily: 'sans-serif', lineHeight: '20px', userSelect: 'none', maxWidth: 428}}>
            <div style={{display: 'flex'}}>
                <div style={{width: 300}}>
                    <div>{order.username}</div>
                    <div style={{color: 'rgb(255, 105, 0)', fontSize: 10, lineHeight: '10px'}}>Имя</div>
                </div>
                <div>
                    <div onClick={() => {
                        handleUpdate()
                    }}>{status}</div>
                    <div style={{color: 'rgb(255, 105, 0)', fontSize: 10, lineHeight: '10px'}}>Статус</div>
                </div>
            </div>

            <div style={{display: 'flex'}}>
                <div style={{marginRight: 10}}>
                    <div>{order.address?.addressName ? order.address.addressName : <div style={{height: 20}}/>}</div>
                    <div style={{color: 'rgb(255, 105, 0)', fontSize: 10, lineHeight: '10px'}}>Название адреса</div>
                </div>
                <div>
                    <div>{order.address?.addressInfo}</div>
                    <div style={{color: 'rgb(255, 105, 0)', fontSize: 10, lineHeight: '10px'}}>Адрес</div>
                </div>
            </div>


            <div>{order.address?.comment ? order.address.comment : <div style={{height: 20}}/>}</div>
            <div style={{color: 'rgb(255, 105, 0)', fontSize: 10, lineHeight: '10px', display: 'flex'}}>Комментарий
            </div>

            <div style={{height: flag ? 0 : '100%', display: 'flex', overflow: 'hidden'}}
                 onClick={() => setFlag(f => !f)}>
                {
                    order.products.map((product, i) => (
                        <>
                            {
                                i < 8 &&
                                <ProductOrder2 product={product}/>
                            }
                        </>
                    ))
                }
                {
                    order.products.length > 8 && <div style={{marginTop: 20}}>...</div>
                }
            </div>
            <div onClick={() => setFlag(f => !f)}>
                {
                    order.products.map((product, i) => (
                        <div className="productOrder" key={i}>
                            <div style={{height: flag ? '100%' : 0, display: 'flex', overflow: 'hidden'}}>
                                <ProductOrder product={product}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="bOrder" style={{width: 200, backgroundColor: '#f0f0f0', color: 'black', marginLeft: 99}}>
                {quantity ? quantity + declOfNum(quantity) : 'loading...'}
                {price !== null ? ' | ' + price + " ₽" : ' | loading...'}
            </div>
        </div>
    )
}
