import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./searchresult.css";
import { KeyboardBackspaceOutlined } from "@material-ui/icons";
import axios from "axios";

const SearchResult = ({ input, cancelSearch }) => {
  const PA = process.env.REACT_APP_PUBLIC_ASSETS;
  const [resultArr, setResultArr] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchResult = async () => {
      const res = await axios.get(`/users/search/${input}`);
      setResultArr(res.data);
    };
    if (input !== "") {
      fetchResult();
    }
  }, [input]);

  useEffect(() => {
    setShow(!(input === ""));
  }, [input]);

  const handleCancelSearch = () => {
    setShow(false);
    return cancelSearch();
  };

  return (
    <>
      <div className="searchContainer" hidden={!show}>
        <div className="searchTop">
          <div className="searchCancel" onClick={handleCancelSearch}>
            <KeyboardBackspaceOutlined />
          </div>
        </div>
        <div className="searchBody">
          <ul className="searchItems">
            {resultArr?.map((result) => (
              <Link
                to={`/profile/${result._id}`}
                style={{ textDecoration: "none" }}
              >
                <li
                  key={result._id}
                  className="searchItem"
                  onClick={() => setShow(false)}
                >
                  <img
                    src={
                      result.profilePicture
                        ? PA + result.profilePicture
                        : `${PA}/person/no_avatar.png`
                    }
                    alt=""
                    className="searchItemIcon"
                  />
                  <span className="searchItemName">{result.username}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
