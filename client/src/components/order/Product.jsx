import axios from "axios";
import {Context} from "../../context/Context";
import {useContext, useEffect, useState} from "react";

export default function Product({post, handleUpdate, index}) {
    const [data, setData] = useState({})

    useEffect(async () => {
        let res = await axios.get("/pizzas/" + post._id);
         res.data = {
                 ...res.data,
                 price: res.data.price[post.desc.sizeNum]
         }
        setData(res.data)
    }, [])

    return (
        <div>
            <div className="basketInfo">
                <img className="basketImg" src={data.photo} alt=""/>
                <div>
                    <p className="basketTitle">{data.title}</p>
                    <p className="basketDesc">{post.desc.size}</p>
                </div>
            </div>
            <hr/>
            <div style={{display: 'flex', height: 36, marginTop: 12}}>
                <p className="basketPrice">{data.price * post.quantity} ₽</p>
                <div className="btnBasket" style={{display: "flex"}}>
                    <div
                        style={{width: 32, userSelect: 'none', cursor: 'pointer'}}
                        onClick={() => {
                            handleUpdate(-1, index);
                        }}>
                        -
                    </div>
                    <div style={{width: 32, userSelect: 'none'}}>{post.quantity}</div>
                    <div
                        style={{width: 32, userSelect: 'none', cursor: 'pointer'}}
                        onClick={() => {
                            handleUpdate(1, index);
                        }}>
                        +
                    </div>
                </div>
            </div>
        </div>
)
}
