import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
export default function Profile() {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const userid = useParams().userid;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userid=${userid}`);
      setUser(res.data);
    };
    fetchUser();
    window.scrollTo(0, 0);
  }, [userid]);
  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <div className="profileWrapper">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? PA + user.coverPicture
                      : `${PA}/no_cover.jpg`
                  }
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? PA + user.profilePicture
                      : `${PA}/person/no_avatar.png`
                  }
                  alt=""
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed user={user} />
              <Rightbar user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
