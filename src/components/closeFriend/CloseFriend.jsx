import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PA + user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
