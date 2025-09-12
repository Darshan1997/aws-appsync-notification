import { useEffect, useState } from "react";
import { client } from "../graphql/client";
import { GET_NOTIFICATIONS } from "../graphql/queries";

export interface Notification {
  notificationId: string;
  userId: string;
  email: string;
  channel: string;
  groupName: string;
  topicName: string;
  message: string;
  priority?: string;
  status?: string;
  readStatus?: boolean;
  createdAt: string;
  createdBy?: string;
  viewedAtDateTime?: string;
  viewedBy?: string;
}

const priorityOrder: Record<string, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

export function useNotifications(groupName: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);
        const res = await client.request<{ getNotifications: Notification[] }>(
          GET_NOTIFICATIONS,
          { groupName }
        );
        const results = res.getNotifications.sort(
          (a, b) => (priorityOrder[b.priority || "LOW"] || 0) - (priorityOrder[a.priority || "LOW"] || 0)
        );
        setNotifications(results);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [groupName]);

  return { notifications, loading };
}
