import "./sidebar.css";
import {
  MapRounded,
  CloudRounded,
  Event,
  WorkRounded,
} from "@material-ui/icons";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <MapRounded className="sidebarIcon" />
            <span className="sidebarListItemText">Map</span>
          </li>
          <li className="sidebarListItem">
            <CloudRounded className="sidebarIcon" />
            <span className="sidebarListItemText">Weather</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Schedules</span>
          </li>
          <li className="sidebarListItem">
            <WorkRounded className="sidebarIcon" />
            <span className="sidebarListItemText">Time sheets</span>
          </li>
        </ul>

        {/* <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
