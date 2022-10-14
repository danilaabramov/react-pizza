import "./post.css";
import { Link } from "react-router-dom";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Context} from "../../context/Context";




export default function Post({ post }) {


    const ref = useRef()

    const { user, dispatch} = useContext(Context);


    const [st, setSt] = useState(0)


    useEffect(() => {
        if(!ref) return
        setSt(ref.current?.clientHeight - 70)
    }, [ref])


    return (
        <div ref={ref} className="post" onClick={() => {
            if(user?.username !== 'admin') {
                if (user)
                    dispatch({type: "UPDATE3", payload: post})
                else window.location.replace("/login")
            }
        }}
        >
            <div style={{display: 'flex', position: 'absolute', transform: `translateY(${st}px)`,
            opacity: st}}>
                <p className="postPrice">от {post.price[0]} ₽ </p>
                {user ?
                    <div className="btn" onClick={() => dispatch({ type: "UPDATE3", payload: post})}
                         style={{margin: '7px 6px 7px'}}>
                        Выбрать
                    </div> :
                    <Link className="btn" to="/login"
                          style={{margin: '7px 6px 7px'}}>
                        Выбрать
                    </Link>
                }
            </div>



            <img  className="postImg" src={post.photo} alt=""/>
            <div className="postInfo">
                <Link to={user?.username === 'admin' ? `/pizza/${post._id}` : ''} className="link"
                      style={{cursor: user?.username === 'admin' ? 'pointer' : 'text'}}>
                    <span className="postTitle">
                        {post.title}</span>
                </Link>
                <hr/>
            </div>
            <p className="postDesc">{post.desc}</p>




        </div>
    );
}
