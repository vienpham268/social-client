import  './conversation.css';



const Conversation = () => {
    const PA = process.env.REACT_APP_PUBLIC_ASSETS;
    return (<div className="conversation">
        <img src={`${PA}/person/3.jpeg`} alt="" className="conversationImg" />
        <span className="conversationName">John</span>
    </div>  );
}
 
export default Conversation;