import type { Notification } from "../hooks/useNotifications";
import "./NotificationItem.css";

interface Props {
  notification: Notification;
}

function NotificationItem({ notification }: Props) {
  const priorityClass = notification.priority
    ? notification.priority.toLowerCase()
    : "low";

  return (
    <div className={`notification-item ${priorityClass}`}>
      {!notification.readStatus && <div className="unread-dot" />}
      <div className="notification-content">
        <h4 className="topic">{notification.topicName}</h4>
        <p className="message">{notification.message}</p>
        <span className="timestamp">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default NotificationItem;
