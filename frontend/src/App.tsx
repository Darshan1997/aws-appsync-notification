import "./App.css";
import NotificationSubscriber from "./components/NotificationSub";

export const NotificationGroup = {
  SALES: "SALES",
  MARKETING: "MARKETING",
  SERVICE: "SERVICE",
  MANUFACTURING: "MANUFACTURING",
  MANAGEMENT: "MANAGEMENT",
} as const;

function App() {
  return (
    <div className="app-container">
       <NotificationSubscriber />
    </div>
  );
}

export default App;
