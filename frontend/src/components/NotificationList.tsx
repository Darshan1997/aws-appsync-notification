import type { Notification } from "../hooks/useNotifications";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: Notification[];
}

function NotificationList({ notifications }: Props) {
  if (notifications.length === 0) {
    return <p>No notifications available.</p>;
  }

  return (
    <div>
      {notifications.map((n) => (
        <NotificationItem key={n.notificationId} notification={n} />
      ))}
    </div>
  );
}

export default NotificationList;
