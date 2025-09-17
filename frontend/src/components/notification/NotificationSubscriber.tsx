import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { APPSYNC_API_KEY, APPSYNC_HOST } from "../../commonHelper/envs";
import { getWebsocketUrl } from "../../commonHelper/getWebsocketUrl";
import { NOTIFICATION_SUBSCRIPTION } from "../../graphql/subscription/subscription.onNewNotificationByGroup";
import { useToast } from "../common/Toast";
import { client } from "../../graphql/common/client";
import { GET_NOTIFICATIONS } from "../../graphql/query/query.getNotifications";

function startSubscription(websocket: WebSocket, payload: { groupName: string; }) {
    const subscribeMessage = {
        id: crypto.randomUUID(),
        type: "start",
        payload: {
            data: JSON.stringify({
                query: NOTIFICATION_SUBSCRIPTION,
                variables: { groupName: payload.groupName }
            }),
            extensions: {
                authorization: {
                    "x-api-key": APPSYNC_API_KEY,
                    host: APPSYNC_HOST,
                },
            },
        },
    };

    if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(subscribeMessage));
    } else {
        websocket.addEventListener("open", () => {
            websocket.send(JSON.stringify(subscribeMessage));
        }, { once: true });
    }


}

const NotificationSubscriber: React.FC<{ groupName: string }> = ({ groupName }) => {
    const [messages, setMessages] = useState([]);
    const { showToast } = useToast();

    useEffect(() => {
        const url = getWebsocketUrl();
        const websocket = new WebSocket(url, ["graphql-ws"]);

        const handleMessage = (event: MessageEvent) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "connection_ack":
                    const payload = { groupName }
                    startSubscription(websocket, payload);
                    break;
                case "start_ack":
                    console.log("Subscription acknowledged");
                    break;
                case "error":
                    console.error("WS Error:", message);
                    break;
                case "data":
                    const notificationData =
                        message.payload?.data?.onNewNotificationByGroup;
                    if (notificationData) {
                        showToast(`New Notification for ${notificationData.groupName}`, "success");
                        setMessages((prev) => [].concat(prev).concat(notificationData));
                    }

                    break;
            }
        }

        websocket.addEventListener("open", () => {
            websocket.send(JSON.stringify({ type: "connection_init" }));
        });

        websocket.addEventListener("message", handleMessage);

        return () => {
            websocket.removeEventListener("message", handleMessage);
            websocket.close();
        };
    }, []);

    useEffect(() => {
        async function fetchNotifications() {
            const res = await client.request<{ getNotifications: Notification[] }>(
                GET_NOTIFICATIONS,
                { groupName }
            );
        }

        fetchNotifications();
    })

    return (
        <div className="p-4">
            <h2 className="font-bold text-lg mb-2">Notifications</h2>
            {messages.length === 0 ? (
                <h4>No notifications yet...</h4>
            ) :
                <div style={{paddingTop: "10px"}}>
                    {messages.map((msg: any) => (
                        <NotificationItem key={msg.notificationId} notification={msg} />
                    ))}
                </div>
            }
        </div>
    );
};

export default NotificationSubscriber;
