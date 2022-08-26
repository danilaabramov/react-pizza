import X from "../../pages/home/X";
import {Context} from "../../context/Context";
import {useContext, useEffect, useState} from "react";
import { CSSTransition } from 'react-transition-group';
import axios from "axios";
export default function PostDetails({ closeDialog, products }) {
    const [size, setSize] = useState(1)
    const {update3, dispatch, user} = useContext(Context);

    const handleUpdate = async () => {
        let flag = true
        let p = products
        for(let i = 0; i < p.length; ++i)
            if (update3._id === p[i]._id && size === p[i].desc.sizeNum) {
                flag = false
                ++p[i].quantity
            }
        let updatedOrder
        if (flag) updatedOrder = {
            products: [
                ...p,
                {
                    _id: update3._id,
                    desc: {
                        size: size === 0 ? 'Маленькая 25 см' :
                            size === 1 ? 'Средняя 30 см' :
                                'Большая 35 см',
                        sizeNum: size
                    },
                    quantity: 1
                }
            ]
        }
        else updatedOrder = {products: [...p]}
        try {
            await axios.put("/orders/" + user.orderId[user.orderId.length - 1], updatedOrder)
        } catch (err) {}
        dispatch({ type: "UPDATE" })
        dispatch({ type: "UPDATE3", payload: null})
        setSize(1)
    };

    const close = () => {
        closeDialog()
        setSize(1)
    }

    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        setInterval(() => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }, 0.1)
    })

    const [flag, setFlag] = useState(false)

    useEffect(() => {
       setFlag(true)
    },[])

    return (
        <CSSTransition
            in={flag}
            timeout={300}
            classNames="alert"
            unmountOnExit

        >
        <div style={{height: '100%', overflow: 'scroll', position: 'fixed', zIndex: 1000, right: 0,
            width: '100vw', top: 0}}>
            <div style={{height: 'calc(50% - 305px)'}} onClick={close}/>
            <div style={{display: 'flex'}}>
                <div style={{width: 'calc(50% - 462px)'}} onClick={close}/>
                <div style={{width: 924, height: 610, borderRadius: 20, backgroundColor: 'white',}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <div style={{width: 540, paddingLeft: 16, height: 610, boxShadow: '0 0 100px rgba(0, 0, 0, 0.1)',
                            userSelect: 'none'}}>
                            <img src={update3.photo} style={{
                                transition: '.5s',
                                height: size === 0 ? 350 : size === 1 ? 426 :
                                    size === 2 ? 502 : null,
                                width: size === 0 ? 350 : size === 1 ? 426 :
                                    size === 2 ? 502 : null,
                                marginTop: size === 0 ? 140 : size === 1 ? 102 :
                                    size === 2 ? 64 : null,
                                marginLeft: size === 0 ? 89 : size === 1 ? 51 :
                                    size === 2 ? 13 : null,
                            }} alt=""/>
                            {
                                size < 1 &&
                                <div style={{position: 'absolute',
                                    top: height > 610 ? 'calc(50% - 191px)' : 114,
                                    left: width > 926 ? 'calc(50% - 383px)' : 79}}>
                                    <svg width="382" height="382" viewBox="0 0 382 382" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="191" cy="191" r="190" stroke="#6F6E6F" strokeWidth="0.6"
                                                strokeLinecap="round" strokeLinejoin="round"
                                                strokeDasharray="1 6.1"/>
                                    </svg>
                                </div>
                            }
                            {
                                size < 2 &&
                                <div style={{position: 'absolute',
                                    top: height > 610 ? 'calc(50% - 225px)' : 80,
                                    left: width > 926 ? 'calc(50% - 417px)' : 45}}>
                                    <svg width="450" height="450" viewBox="0 0 450 450" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <ellipse opacity="0.6" cx="225" cy="225" rx="224" ry="224" stroke="#6F6E6F"
                                                 strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"
                                                 strokeDasharray="2 12.2"/>
                                    </svg>
                                </div>
                            }
                        </div>
                        <div style={{height: '100%', width: 368}}>
                            <div style={{marginTop: 40, width: 334, marginLeft: 22, fontWeight: 500, fontSize: 24,
                                fontFamily: 'sans-serif'}}>
                                {update3.title}
                            </div>
                            <div style={{marginTop: 10, width: 334, marginLeft: 22, fontSize: 14,
                                fontFamily: 'sans-serif', lineHeight: 1.5, color: 'rgb(92, 99, 112)'}}>
                                {size === 0 ? '25 см' :
                                    size === 1 ? '30 см' :
                                        '35 см'}
                            </div>
                            <div style={{marginTop: 10, width: 334, marginLeft: 22, fontSize: 14,
                                fontFamily: 'sans-serif', lineHeight: 1.5}}>
                                {update3.desc}
                            </div>
                            <div className="btnHome" style={{width: 324, height: 28, lineHeight: '28px',
                                marginLeft: 22, backgroundColor: 'rgb(243, 243, 247)', color: 'black', fontSize: 12, padding: 4,
                                marginTop: 10}}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>



                                    <div style={{ width: 108, height: 28, position: 'absolute', backgroundColor: 'white',
                                        borderRadius: 20, transform: size < 1 ? 'translateX(-108px)' : size === 1 ? null :  'translateX(108px)',
                                        transition: '.5s'}}>
                                    </div>




                                    <div style={{width: 108, position: 'absolute', transform: 'translateX(-108px)'}} onClick={()=>setSize(0)}>
                                        <div style={{
                                            borderRadius: 20}}>
                                            Маленькая
                                        </div>
                                    </div>
                                    <div style={{width: 108, position: 'absolute'}} onClick={()=>setSize(1)}>
                                        <div style={{
                                            borderRadius: 20}}>
                                            Средняя
                                        </div>
                                    </div>
                                    <div style={{width: 108, position: 'absolute', transform: 'translateX(108px)'}} onClick={()=>setSize(2)}>
                                        <div style={{
                                            borderRadius: 20}}>
                                            Большая
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btnHome" style={{width: 318, height: 32, position: 'absolute', bottom: 'calc(50% - 285px)',
                                right: 'calc(50% - 454px)', lineHeight: '32px'}} onClick={handleUpdate}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>Добавить в корзину за {update3.price[size]} ₽</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{width: 'calc(50% - 462px)'}} onClick={close}>
                    <div style={{ marginLeft: 15, marginTop: 15,
                        width: 25, height: 25, zIndex: 2000, cursor: 'pointer'}}>
                        <X/>
                    </div>
                </div>
            </div>
            <div style={{height: 'calc(50% - 305px)'}} onClick={close}/>
        </div>
            </CSSTransition>
    );
}
