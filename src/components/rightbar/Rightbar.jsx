import "./rightbar.css";
import axios from "axios";
import HomeRightBar from "./HomeRightBar";
import ProfileRightbar from "./ProfileRightBar";

export default function Rightbar({ user }) {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user} /> : <HomeRightBar />}
      </div>
    </div>
  );
}
