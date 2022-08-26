
import PostAnalytics from "./PostAnalytics";

export default function PostsAnalytics({ posts }) {
    return (
        <div style={{margin: 'auto'}} >
            {posts.map((p, i) => (
                <PostAnalytics key={i} post={p} index={i}/>
            ))}
        </div>
    );
}
