import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import ProfileFriends from "../profileFriend/ProfileFriends";
import { Add, Remove } from "@material-ui/icons";
import "./rightbar.css";

const ProfileRightbar = ({ user }) => {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const { currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    setFollowed(user.followers && user.followers.includes(currentUser._id));
  }, [user]);
  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user._id !== currentUser._id ? (
        <button className="followBtn" onClick={handleFollow}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
      ) : null}
      <h4 className="rightbarTitle">User information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">
        {user?.followings?.length !== 0 ? "Followings" : null}
      </h4>
      {user?.followings?.length !== 0 ? (
        <div className="rightbarFollowings">
          {user.followings &&
            user.followings.map((friendId) => (
              <ProfileFriends friendId={friendId} key={friendId} />
            ))}
        </div>
      ) : null}
    </>
  );
};

export default ProfileRightbar;
