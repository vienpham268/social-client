import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import "./messenger.css";

const Messenger = () => {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own />
              <Message />
              <Message />
              <Message own />
              <Message />
              <Message />
              <Message own />
              <Message />
              <Message />
              <Message own />
            </div>
            <div className="chatBoxBottom">
              <input type="text" placeholder="Aa" className="chatInput" />
              <button className="chatSubmitBtn">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">Online</div>
        </div>
      </div>      
    </>
  );
};

export default Messenger;
