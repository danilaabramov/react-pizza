import axios from "axios";
import {useEffect, useState} from "react";

export default function ProductOrder2({product}) {

    const [data, setData] = useState(null)

    useEffect(async () => {
        const res = await axios.get("/pizzas/" + product._id);
        setData(res.data)
    }, [])

    return (
        <>

                {
                    data ? <img className="orderImg" src={data.photo} alt="" style={{marginRight: 0}}/>
                        : <img className="orderImg" src='https://dodopizza-a.akamaihd.net/site-static/dist/611f501db3a3369fac31.svg' alt="" style={{marginRight: 0}}/>
                }

        </>
    )
}
