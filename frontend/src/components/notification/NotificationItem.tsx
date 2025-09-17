import type { Notification } from "../../types/notifications";
import "./NotificationItem.css";
import { FaTools, FaBullhorn, FaShoppingCart, FaBell } from "react-icons/fa";

interface Props {
  notification: Notification;
}

function NotificationItem({ notification }: Props) {
  const priorityClass = notification.priority
    ? notification.priority.toLowerCase()
    : "low";

  const getGroupIcon = (groupName: string) => {
    switch (groupName) {
      case "SERVICE":
        return <FaTools />;
      case "MARKETING":
        return <FaBullhorn />;
      case "SALES":
        return <FaShoppingCart />;
      default:
        return <FaBell />;
    }
  };

  return (
    <div className={`notification-item ${priorityClass}`}>
      <div className="notification-icon">{getGroupIcon(notification.groupName)}</div>
      <div className="notification-content">
        <div className="topic-row">
          <h4 className="topic">{notification.topicName.replace(/_/g, " ")}</h4>
          <span className={`badge ${priorityClass}`}>{notification.priority}</span>
        </div>
        <p className="message">{notification.message}</p>
        <span className="timestamp">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default NotificationItem;
