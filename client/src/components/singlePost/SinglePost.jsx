import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {Context} from "../../context/Context";
import "./singlePost.css";
import TopBar from "../topbar/TopBar";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const [price1, setPrice1] = useState(null);
    const [price2, setPrice2] = useState(null);
    const [price3, setPrice3] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/pizzas/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setPrice1(res.data.price[0])
            setPrice2(res.data.price[1])
            setPrice3(res.data.price[2])
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/pizzas/${post._id}`);
            window.location.replace("/");
        } catch (err) {
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/pizzas/${post._id}`, {
                title,
                desc,
                price: [
                    Number(price1),
                    Number(price2),
                    Number(price3)
                ]
            });
            setUpdateMode(false)
        } catch (err) {
        }
    };

    return (
        <div className="singlePost">
            <TopBar/>
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={post.photo} alt="" className="singlePostImg"/>
                )}
                <div>
                    {updateMode ? (
                        <input
                            type="text"
                            value={title}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    ) : (
                        <h1 className="singlePostTitle">
                            {title}
                            {"admin" === user?.username && (
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon far fa-edit"
                                       onClick={() => setUpdateMode(true)}/>
                                    <i className="singlePostIcon far fa-trash-alt"
                                       onClick={handleDelete}/>
                                </div>
                            )}
                        </h1>
                    )}
                    {updateMode && (
                        <button className="singlePostButton" onClick={handleUpdate}>
                            Обновить
                        </button>
                    )}
                    <div className="singlePostInfo">

                        {updateMode ? (
                            <textarea
                                className="singlePostDescInput"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        ) : (
                            <p className="singlePostDesc">{desc}</p>
                        )}


                    </div>

                    <div style={{display: 'flex', justifyContent: 'center', marginRight: 40}}>
                        {updateMode ? (
                            <input
                                type="number"
                                value={price1}
                                className="singlePostTitleInput" style={{width: 100}}
                                onChange={(e) => setPrice1(e.target.value)}
                            />
                        ) : (
                            <h1 className="singlePostTitle" style={{fontWeight: 100}}>
                                {price1} ₽
                            </h1>
                        )}
                        {updateMode ? (
                            <input
                                type="number"
                                value={price2}
                                className="singlePostTitleInput" style={{width: 100}}
                                onChange={(e) => setPrice2(e.target.value)}
                            />
                        ) : (
                            <h1 className="singlePostTitle" style={{fontWeight: 100}}>
                                {price2} ₽
                            </h1>
                        )}
                        {updateMode ? (
                            <input
                                type="number"
                                value={price3}
                                className="singlePostTitleInput" style={{width: 100}}
                                onChange={(e) => setPrice3(e.target.value)}
                            />
                        ) : (
                            <h1 className="singlePostTitle" style={{fontWeight: 100}}>
                                {price3} ₽
                            </h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
