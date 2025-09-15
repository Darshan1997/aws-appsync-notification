import React, { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { APPSYNC_API_KEY, APPSYNC_HOST } from "../../commonHelper/envs";
import { getWebsocketUrl } from "../../commonHelper/getWebsocketUrl";
import { NOTIFICATION_SUBSCRIPTION } from "../../graphql/subscription/subscription.onNewNotificationByGroup";

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
    console.log(websocket.readyState);

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

    return (
        <div className="p-4">
            <h1 className="font-bold text-lg mb-2">Notifications</h1>
            {messages.length === 0 ? (
                <h4>No notifications yet...</h4>
            ) :
                <div>
                    {messages.map((msg: any) => (
                        <NotificationItem key={msg.notificationId} notification={msg} />
                    ))}
                </div>
            }
        </div>
    );
};

export default NotificationSubscriber;
