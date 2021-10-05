import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {currentUser ? <Home /> : <Register />}
        </Route>
        <Route exact path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {currentUser ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route exact path="/messenger">
          {!currentUser ? <Redirect to="/login" /> : <Messenger />}
        </Route>
        <Route exact path="/profile/:userid">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
