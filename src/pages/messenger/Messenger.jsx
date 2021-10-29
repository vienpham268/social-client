import { useRef, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const scrollRef = useRef();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("Initialize new socket..");
    socket.current = io("ws://localhost:8900");
    socket.current.on("getUsers", (users) => {
      console.log("users", users);
    });
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
  }, [currentUser]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversation/${currentUser._id}`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [currentUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitChat = async (e) => {
    e.preventDefault();
    const newChat = {
      senderId: currentUser._id,
      conversationId: currentChat?._id,
      text: newMessage,
    };
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: currentChat?.members.find(
        (member) => member !== currentUser._id
      ),
      text: newMessage,
    });
    try {
      const res = await axios.post("/message", newChat);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

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
            {conversations.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  currentUser={currentUser}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {currentChat ? (
                messages?.map((message) => (
                  <div ref={scrollRef} className="scrollRef">
                    <Message
                      key={message._id}
                      message={message}
                      currentUser={currentUser}
                    />
                  </div>
                ))
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
            {currentChat ? (
              <form className="chatBoxBottom" onSubmit={handleSubmitChat}>
                <input
                  type="text"
                  placeholder="Aa"
                  className="chatInput"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                />
                <button
                  type="submit"
                  disabled={newMessage === ""}
                  className="chatSubmitBtn"
                >
                  Send
                </button>
              </form>
            ) : null}
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
