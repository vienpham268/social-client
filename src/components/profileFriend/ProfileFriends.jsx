import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../rightbar/rightbar.css";
const ProfileFriends = ({ friendId }) => {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const [friend, setFriend] = useState({});
  useEffect(() => {
    const fetchUserFromId = async () => {
      const res = await axios.get(`/users?userid=${friendId}`);
      setFriend(res.data);
    };
    fetchUserFromId();
  }, [friendId]);
  return (
    <>
      <div className="rightbarFollowing">
        <Link to={`/profile/${friend._id}`} style={{ textDecoration: "none" }}>
          <img
            src={
              friend.profilePicture
                ? PA + friend.profilePicture
                : `${PA}/person/no_Avatar.png`
            }
            alt=""
            className="rightbarFollowingImg"
          />
        </Link>
      </div>
    </>
  );
};

export default ProfileFriends;
