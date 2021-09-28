import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import "./post.css";
import {
  MoreVert,
  Share,
  ModeComment,
  ThumbUpAlt,
  InsertEmoticon,
  PhotoCamera,
} from "@material-ui/icons";

export default function Post({ post }) {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");
  const [numOfLikes, setNumOfLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUserViaPost = async () => {
      const res = await axios.get(`/users?userid=${post.userId}`);
      setUser(res.data);
    };
    fetchUserViaPost();
  }, [post]);

  const handleLike = async () => {
    await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    setNumOfLikes(isLiked ? numOfLikes - 1 : numOfLikes + 1);
    setIsLiked(!isLiked);
  };

  const handleWriteComment = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const newComment = {
      postId: post._id,
      username: currentUser.username,
      desc: comment,
    };
    if (currentUser.profilePicture)
      newComment.userPicture = currentUser.profilePicture;

    try {
      await axios.post("/comments", newComment);
      setComment("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PA + user.profilePicture
                    : `${PA}/person/no_avatar.png`
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PA + post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postInteractionsCounter">
            <div className="postLikeCounter">
              <img className="likeIcon" src={`${PA}/like.png`} alt="" />
              <img className="likeIcon" src={`${PA}/heart.png`} alt="" />
              <span className="postLikeCounterText">
                {numOfLikes} people like it
              </span>
            </div>
            <span className="postCommentCounter">
              {post.comments.length} comments
            </span>
          </div>
          <hr className="postHr" />
          <div className="postActions">
            <div className="postActionItem" onClick={handleLike}>
              <ThumbUpAlt
                className="postActionIcon"
                htmlColor={isLiked ? "blue" : "black"}
              />
              <span>Like</span>
            </div>
            <label className="postActionItem" htmlFor={`${post._id}`}>
              <ModeComment className="postActionIcon" />
              <span>Comment</span>
            </label>
            <div className="postActionItem">
              <Share className="postActionIcon" /> <span>Share</span>
            </div>
          </div>
          <hr className="postHr" />
          {post.comments.length > 0 && (
            <Comment commentIdArray={post.comments} />
          )}
          <div className="postComment">
            <img
              src={
                currentUser.profilePicture
                  ? PA + currentUser.profilePicture
                  : `${PA}/person/no_avatar.png`
              }
              alt=""
              className="postCurrentUserImg"
            />
            <form className="postWriteComment" onSubmit={handleSubmitComment}>
              <input
                type="text"
                value={comment}
                className="postCommentInput"
                placeholder="Input comment..."
                id={`${post._id}`}
                onChange={handleWriteComment}
              />
              <div className="postCommentInsertItems">
                <div className="postCommentInsertItem">
                  <InsertEmoticon />
                </div>
                <div className="postCommentInsertItem">
                  <PhotoCamera />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
