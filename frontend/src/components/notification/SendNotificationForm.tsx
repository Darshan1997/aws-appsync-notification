import React, { useState } from "react";
import type { NotificationInput } from "../../types/notifications";
import { NOTIFICATION_CHANNELS, NOTIFICATION_GROUPS, NOTIFICATION_PRIORITY, NOTIFICATION_TOPICS } from "../../constants/notification";
import { client } from "../../graphql/common/client";
import './SendNotificationForm.css';
import { SEND_NOTIFICATION } from "../../graphql/mutation/mutation.sendNotification";
import { useToast } from "../common/Toast";

const SendNotificationForm: React.FC = () => {
    const { showToast } = useToast();
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState<NotificationInput>({
        userId: "",
        email: "",
        channel: "INAPP",
        groupName: "SERVICE",
        topicName: "ENGINE_DIAGNOSTICS_ALERT",
        message: "",
        readStatus: true,
        priority: "HIGH",
        status: "NEW",
        deepLinkUrl: "",
        viewedBy: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSending(true);
            const response = await client.request(SEND_NOTIFICATION, { input: formData });
            console.log("Notification sent:", response);
            setSending(false);
            showToast("Notification Sent Successfully", "success");
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Send Notification</h2>
            <form onSubmit={handleSubmit}>
                <input name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} required />

                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

                <select name="channel" value={formData.channel} onChange={handleChange} required>
                    {NOTIFICATION_CHANNELS.map((channel) => (
                        <option key={channel} value={channel}>{channel}</option>
                    ))}
                </select>

                <select name="groupName" value={formData.groupName} onChange={handleChange}>
                    {NOTIFICATION_GROUPS.map((group) => (
                        <option key={group} value={group}>{group}</option>
                    ))}
                </select>

                <select name="topicName" value={formData.topicName} onChange={handleChange}>
                    {NOTIFICATION_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>

                <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />

                <select name="priority" value={formData.priority} onChange={handleChange}>
                    {NOTIFICATION_PRIORITY.map((priority) => (
                        <option key={priority} value={priority}>{priority}</option>
                    ))}
                </select>

                {/* <select name="status" value={formData.status} onChange={handleChange}>
                    {NOTIFICATION_STATUSES.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select> */}

                <input name="deepLinkUrl" placeholder="Deep Link URL" value={formData.deepLinkUrl} onChange={handleChange} />
                {/* <input name="createdBy" placeholder="Created By" value={formData.createdBy} onChange={handleChange} /> */}

                <button
                    type="submit"
                    disabled={sending}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: sending ? "not-allowed" : "pointer",
                        backgroundColor: sending ? "#aaa" : "#4caf50",
                        color: "white",
                    }}
                >{sending ? 'sending' : 'Send Notification'}</button>
            </form>
        </div>
    );
};

export default SendNotificationForm;
