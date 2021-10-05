import "./message.css";

const Message = ({ own }) => {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop ">
        <img src={`${PA}/person/3.jpeg`} alt="" className="messageImg" />
        <span className="messageText">
          without any file name to unstage all due changes.
        </span>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
