import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Cancel } from "@material-ui/icons";
import axios from "axios";

export default function Share() {
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = `/${file.name}`;
      data.append("file", file);
      data.append("aa", fileName);
      newPost.image = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentUser.profilePicture
                ? PA + currentUser.profilePicture
                : `${PA}/person/no_avatar.png`
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${currentUser.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBody">
          {file && (
            <div className="shareImgContainer">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="shareImg"
              />
              <Cancel
                className="shareImgCancel"
                onClick={() => setFile(null)}
              />
            </div>
          )}
        </div>

        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                hidden
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
