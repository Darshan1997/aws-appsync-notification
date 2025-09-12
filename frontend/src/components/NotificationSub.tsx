import React, { useEffect, useState } from "react";
import { NOTIFICATION_SUBSCRIPTION } from "../graphql/queries";
import NotificationItem from "./NotificationItem";
import { APPSYNC_API_KEY, APPSYNC_HOST } from "../utils/envs";
import { getWebsocketUrl } from "../utils/getWebsocketUrl";

function startSubscription(websocket: WebSocket) {
  const subscribeMessage = {
    id: crypto.randomUUID(),
    type: "start",
    payload: {
      data: JSON.stringify({
        query: NOTIFICATION_SUBSCRIPTION,
      }),
      extensions: {
        authorization: {
          "x-api-key": APPSYNC_API_KEY,
          host: APPSYNC_HOST,
        },
      },
    },
  };

  websocket.send(JSON.stringify(subscribeMessage));
}

const NotificationSubscriber: React.FC = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const url = getWebsocketUrl();
    const websocket = new WebSocket(url, ["graphql-ws"]);

    websocket.addEventListener("open", () => {
      websocket.send(JSON.stringify({ type: "connection_init" }));
    });

    websocket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "connection_ack":
          startSubscription(websocket);
          break;
        case "start_ack":
          console.log("Subscription acknowledged");
          break;
        case "error":
          console.error("WS Error:", message);
          break;
        case "data":
          const notificationData =
            message.payload?.data?.onNewNotification;
          if (notificationData) {
            setMessages((prev) => [].concat(prev).concat(notificationData));
          }
          
          break;
      }
    });

    return () => {
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
        {messages.map((msg:any) => (
        <NotificationItem key={msg.notificationId} notification={msg} />
      ))}
      </div>
      }
    </div>
  );
};

export default NotificationSubscriber;
