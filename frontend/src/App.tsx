import "./App.css";
import NotificationSubscriber from "./components/NotificationSub";

export const NotificationGroup = {
  SALES: "SALES",
  MARKETING: "MARKETING",
  SERVICE: "SERVICE",
  MANUFACTURING: "MANUFACTURING",
  MANAGEMENT: "MANAGEMENT",
} as const;

const groups = [
  NotificationGroup.SALES,
  NotificationGroup.MARKETING,
  NotificationGroup.SERVICE
];

function App() {
  return (
      <div className="notification-board">
        {groups.map((group) => (
          <div key={group} className="notification-column">
            <h2>{group}</h2>
            <div className="notification-list">
              <NotificationSubscriber groupName={group} />
            </div>
          </div>
        ))}
      </div>
  );
}

export default App;
