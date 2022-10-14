import X from "../../pages/home/X";
import {Context} from "../../context/Context";
import {useContext, useState} from "react";
import axios from "axios";

export default function Delivery({close}) {

    const {dispatch, user, delivery} = useContext(Context);
    const [street, setStreet] = useState(null)
    const [dom, setDom] = useState(null)
    const [kv, setKv] = useState(null)
    const [pod, setPod] = useState(null)
    const [door, setDoor] = useState(null)
    const [etaj, setEtaj] = useState(null)
    const [name, setName] = useState()
    const [comment, setComment] = useState()

    const sub = async () => {
        let products = delivery


        try {
            await axios.put("/orders/" + user.orderId[user.orderId.length - 1], {
                ...delivery,
                address: {
                    addressInfo: "ул. " + street + ", д. " + dom +
                        `${pod ? (", под. " + pod) : ""}` +
                        `${etaj ? (", эт. " + etaj) : ""}` +
                        `${kv ? (", кв. " + kv) : ""}` +
                        `${door ? (", код " + door) : ""}`,
                    addressName: name,
                    comment
                },
                status: 'Принят'
            });


            try {
                let res = await axios.post("/orders", {
                    username: user.username,
                });

                let userData = await axios.get("/users/" + user._id);
                dispatch({type: "UPDATE_START"});


                let userUp = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    coins: userData.data.coins + delivery.coins,
                    orderId: [
                        ...user.orderId,
                        res.data._id
                    ]
                }
                console.log(delivery.coins)
                console.log('data', userUp)
                try {
                    res = await axios.put("/users/" + user._id, userUp);
                    console.log('data', res.data._id)


                    dispatch({
                        type: "UPDATE_SUCCESS", payload: {
                            ...res.data
                        }
                    });

                } catch (err) {
                    dispatch({type: "UPDATE_FAILURE"});
                    console.log(err)
                }
            } catch (err) {
                console.log(err)
            }
        } catch (err) {
            console.log(err)
        }
        dispatch({type: "UPDATE"})
        dispatch({type: "SHOWBASKET", payload: false})
        close()

        try{
            for (let i = 0; products.products.length; ++i){
                const pizza = await axios.get("/pizzas/" +  products.products[i]._id)

                const analitic = await axios.get("/analyticpizzas/" + products.products[i]._id)

                await axios.put("/analyticpizzas/" + products.products[i]._id, {
                    quantity: analitic.data.quantity + products.products[i].quantity,
                    price: analitic.data.price + pizza.data.price[products.products[i].desc.sizeNum],
                });
            }
        } catch (e){}

    }

    return (
        <div style={{height: '100%', overflow: 'scroll', position: 'fixed', zIndex: 3000, right: 0,
            width: '100vw', top: 0}}>
            <div style={{height: 'calc(50% - 365px)'}} onClick={close}/>
            <div style={{display: 'flex'}}>
                <div style={{width: 'calc(50% - 440px)'}} onClick={close}/>
                <div style={{width: 880, height: 730, borderRadius: 20, backgroundColor: 'white',}}>

                    <div style={{margin: 50, fontSize: 32, fontFamily: 'sans-serif'}}>
                        Куда доставить?
                    </div>
                    <div style={{display: 'flex'}}>
                        <input
                            type="text"
                            placeholder="Улица"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 332.5,
                                marginLeft: 50, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                 display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setStreet(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Дом"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 77.5,
                                marginLeft: 10, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setDom(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', marginTop: 20}}>
                        <input
                            type="text"
                            placeholder="Квартира"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 77.5,
                                marginLeft: 50, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setKv(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Подъезд"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 77.5,
                                marginLeft: 10, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setPod(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Код двери"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 77.5,
                                marginLeft: 10, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setDoor(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Этаж"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 77.5,
                                marginLeft: 10, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setEtaj(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', marginTop: 20}}>
                        <input
                            type="text"
                            placeholder="Название адреса"
                            className="writeInput"
                            style={{borderRadius: 10, height: 0, fontSize: 16, width: 460,
                                marginLeft: 50, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex'}}
                            autoFocus={true}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div style={{display: 'flex', marginTop: 20}}>
                        <textarea
                            placeholder="Комментарий к адресу"
                            className="writeInput"
                            style={{borderRadius: 10, minHeight: 82, fontSize: 16, width: 500,
                                marginLeft: 50, boxShadow: '0 0 35px rgba(0, 0, 0, 0.1)',
                                display: 'flex', resize: 'none', boxSizing: 'border-box', padding: '10px 20px',
                                fontFamily: 'sans-serif'}}
                            autoFocus={true}
                            onChange={e => setComment(e.target.value)}
                        />
                    </div>
                    <div onClick={sub} className='btn' style={{width: 220, height: 50, lineHeight: '50px',
                        marginLeft: 50, marginTop: 30}}>Подтвердить адрес</div>
                </div>
                <div style={{width: 'calc(50% - 440px)'}} onClick={close}>
                    <div style={{ marginLeft: 15, marginTop: 15,
                        width: 25, height: 25, zIndex: 2000, cursor: 'pointer'}}>
                        <X/>
                    </div>
                </div>
            </div>
            <div style={{height: 'calc(50% - 365px)'}} onClick={close}/>
        </div>
    );
}
