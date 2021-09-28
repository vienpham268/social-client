import "./rightbar.css";
import Online from "../online/Online";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const HomeRightBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {currentUser.followings.map((user_id) => (
          <Online key={user_id} user_id={user_id} />
        ))}
      </ul>
    </>
  );
};

export default HomeRightBar;
