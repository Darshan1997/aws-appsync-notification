import { useState } from "react";
import NotificationList from "./components/NotificationList";
import { useNotifications } from "./hooks/useNotifications";
import "./App.css";


function App() {
  const [selectedGroup, setSelectedGroup] = useState("SALES");
  const { notifications, loading } = useNotifications(selectedGroup);

  const groups = [
    "SALES",
    "MARKETING",
    "SERVICE",
    "MANUFACTURING",
    "MANAGEMENT"];

  return (
    <div className="app-container">
      <h1>Notifications</h1>

      <div className="group-dropdown">
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
}

export default App;
