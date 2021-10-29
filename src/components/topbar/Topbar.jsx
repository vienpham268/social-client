import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./topbar.css";
import {
  Search,
  ExpandMoreRounded,
  Chat,
  Notifications,
  Home,
  YouTube,
  Storefront,
  SportsEsports,
  People,
} from "@material-ui/icons";
import SearchResult from "../searchResult/SearchResult";
import { useState } from "react";

export default function Topbar() {
  const [input, setInput] = useState("");
  const { currentUser } = useContext(AuthContext);
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const cancelSearch = () => {
    setInput("");
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <img src="/assets/fb.png" alt="" className="fbLogo" />
        </Link>
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            value={input}
            placeholder="Search..."
            className="searchInput"
            onChange={handleChange}
          />
        </div>
        <SearchResult input={input} cancelSearch={cancelSearch} />
      </div>
      <div className="topbarCenter">
        <div className="topbarCenterItem">
          <Home className="topbarCenterIcon" />
        </div>

        <div className="topbarCenterItem">
          <YouTube className="topbarCenterIcon" />
        </div>
        <div className="topbarCenterItem">
          <Storefront className="topbarCenterIcon" />
        </div>
        <div className="topbarCenterItem">
          <People className="topbarCenterIcon" />
        </div>
        <div className="topbarCenterItem">
          <SportsEsports className="topbarCenterIcon" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarRightItems">
          <Link to={`/profile/${currentUser._id}`}>
            <img
              src={
                currentUser.profilePicture
                  ? PA + currentUser.profilePicture
                  : `${PA}/person/no_avatar.png`
              }
              alt=""
              className="topbarImg"
            />
          </Link>

          <Link className="topbarRightItem" to="/messenger">
            <Chat className="topbarRightIcon" htmlColor="black" />
            <span className="topbarIconBadge">2</span>
          </Link>
          <div className="topbarRightItem">
            <Notifications className="topbarRightIcon" htmlColor="black" />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarRightItem">
            <ExpandMoreRounded className="topbarRightIcon" htmlColor="black" />
          </div>
        </div>
      </div>
    </div>
  );
}
