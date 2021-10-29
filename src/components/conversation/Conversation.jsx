import "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find(
      (memberId) => memberId !== currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await axios.get(`/users?userid=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture ? PA + user.profilePicture : `${PA}/person/no_avatar.png`
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
