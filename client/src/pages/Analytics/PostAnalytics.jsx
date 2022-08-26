
import { Link } from "react-router-dom";


export default function PostAnalytics({ post }) {

   function declOfNum(number) {
        return [' товар', ' товара', ' товаров'][(number % 100 > 4 && number % 100 < 20) ?
            2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
    }

    return (
        <div className="post" style={{height: 100, width: 1000}}>
            <div style={{display: 'flex'}}>
            <img  className="postImg" src={post.photo} alt="" style={{width: 100, height: 100, marginTop: 20}}/>
                <div style={{margin: '20px 10px 10px', display: 'flex'}}>
                    <div>

                    <div className="postInfo">
                        <Link to={`/pizza/${post._id}`} className="link">
                            <span className="postTitle">{post.title}</span>
                        </Link>
                    </div>
                    <p className="postDesc" style={{width: 370}}>{post.desc}</p>
                </div>
                    <p className="postPrice" style={{width: 200}}>{post.price} ₽</p>
                    <p className="postPrice" style={{width: 200}}>{post.quantity + declOfNum(post.quantity)}</p>
                </div>
            </div>
        </div>
    );
}
