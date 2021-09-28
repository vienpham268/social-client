import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchPostsViaUser = async () => {
      const res = user
        ? await axios.get(`/posts/profile/${user._id}`)
        : await axios.get(`/posts/timeline/${currentUser._id}`);
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPostsViaUser();
    window.scrollTo(0, 0);
  }, [user, currentUser._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
