import {useEffect, useState} from "react";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import PostsAnalytics from "./PostsAnalytics";

export default function Analytics() {

    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        try {
            const sortPizzas = await axios.get("/analyticpizzas")
            setPosts(sortPizzas.data)
        } catch (e) {console.log(e)}
    }, [])

    const sortQuantity = () => posts.slice(0).sort((a, b) => b.quantity - a.quantity)

    const sortPrice = () => posts.slice(0).sort((a, b) => b.price - a.price)

    return (
        <div>
            <TopBar/>
            <div>
                <div className="home" style={{marginTop: 60}}>
                    <div style={{margin: 'auto'}}>
                        <div style={{
                            display: 'flex', width: 1000, margin: '0 29px',
                            marginTop: 20
                        }}>

                            <div className="btn" style={{width: 200, marginLeft: 523}}
                                 onClick={() => setPosts(sortPrice())}>
                                По прибыльности
                            </div>
                            <div className="btn" style={{width: 200, marginLeft: 20}}
                                 onClick={() => setPosts(sortQuantity())}>
                                По популярности
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home">
                    <PostsAnalytics posts={posts}/>
                </div>
            </div>
        </div>
    );

}
