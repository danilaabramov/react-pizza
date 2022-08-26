import {useEffect, useState} from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        try {
            const res = await axios.get("/pizzas")
            setPosts(res.data)
        } catch (e) {console.log(e)}
    }, [])


    return (
        <div>
            <TopBar/>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
            </div>
        </div>
    );
}
