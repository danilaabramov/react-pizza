import axios from "axios";
import {useEffect, useState} from "react";

export default function ProductOrder({product}) {

    const [data, setData] = useState(null)

    useEffect(async () => {
        const res = await axios.get("/pizzas/" + product._id);
        setData(res.data)
    }, [])

    return (
        <>
            <div className="infos">
                {
                    data ? <div style={{display: 'flex'}}>
                        <img className="orderImg" src={data.photo} alt=""/>
                        <div>
                            <p className="orderTitle">{data.title}</p>
                            <p className="orderDesc">{product.desc.size}</p>
                        </div>
                    </div>
                        : <img className="orderImg" src='https://dodopizza-a.akamaihd.net/site-static/dist/611f501db3a3369fac31.svg' alt="" style={{marginRight: 0}}/>
                }
            </div>
            <div style={{marginTop: 6}}>
                <div className="bOrder" style={{backgroundColor: '#f0f0f0', color: 'black'}}>
                    <div style={{width: 32}}>
                        {product.quantity}
                    </div>
                </div>
            </div>
        </>
    )
}
