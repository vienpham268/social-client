import "./message.css";
import { format } from "timeago.js";


const Message = ({ message, currentUser }) => { 
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  return (
    <div   
      className={
        message?.senderId === currentUser._id ? "message own" : "message"
      }
    >
      <div className="messageTop ">
        <img src={`${PA}/person/3.jpeg`} alt="" className="messageImg" />
        <span className="messageText">{message.text}</span>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
