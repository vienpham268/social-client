import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import "./comment.css";

const Comment = ({ commentIdArray }) => {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const [comments, setComments] = useState([]);
  const [subComments, setSubComments] = useState([]);
  useEffect(() => {
    const findCommentViaId = () => {
      const tempArr = [];
      commentIdArray.map(async (commentId) => {
        try {
          const res = await axios.get(`/comments/${commentId}`);
          if (res) tempArr.push(res.data);
        } catch (error) {
          console.log(error);
        }
      });
      setComments(tempArr);
    };
    findCommentViaId();
  }, [commentIdArray]);
  return (
    <>
      <ul className="listCommentItems">
        {comments.map((comment) => (
          <li className="listCommentItem" key={comment._id}>
            <img
              src={
                comment.userPicture
                  ? PA + comment.userPicture
                  : `${PA}/person/no_avatar.png`
              }
              alt=""
              className="userCommentImg"
            />
            <div className="commentRight">
              <div className="commentRightBody">
                <span className="commentUsername">{comment.username}</span>
                <span className="commentText">{comment?.desc}</span>
                <div className="commentLikeCounter">
                  <img
                    src={`${PA}/like.png`}
                    alt=""
                    className="commentLikeIcon"
                  />
                  <span className="number">1</span>
                </div>
              </div>
              <div className="commentRightBottom">
                <span className="spanText">Like</span>
                <span className="spanText">Response</span>
                <span className="spanText time">
                  {format(comment.createdAt)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Comment;
