import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Notification } from "./components/notification/Notification";
import SendNotificationForm from "./components/notification/SendNotificationForm";
import { ToastProvider } from "./components/common/Toast";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/send" element={
            <SendNotificationForm />
          }
          />
          <Route path="/" element={<Notification />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
