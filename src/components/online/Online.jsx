import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./online.css";
export default function Online({ user_id }) {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserFromId = async () => {
      const res = await axios.get(`/users?userid=${user_id}`);
      setUser(res.data);
    };
    fetchUserFromId();
  }, [user_id]);
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
          <img
            className="rightbarProfileImg"
            src={
              user.profilePicture
                ? PA + user.profilePicture
                : PA + `/person/no_Avatar.png`
            }
            alt=""
          />
          <span className="rightbarOnline"></span>
        </Link>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
