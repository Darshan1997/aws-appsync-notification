import { NOTIFICATION_GROUPS } from "../../constants/notification"
import NotificationSubscriber from "./NotificationSubscriber"

export const Notification: React.FC = () => {
    return (
        <div className="notification-board">
            {NOTIFICATION_GROUPS.map((group) => (
                <div key={group} className="notification-column">
                    <h1>{group}</h1>
                    <div className="notification-list">
                        <NotificationSubscriber groupName={group} />
                    </div>
                </div>
            ))}
        </div>
    )
}