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
            <h2>Notification Publisher</h2>
            <form onSubmit={handleSubmit} className="notification-form">
                <div className="form-group">
                    <label htmlFor="userId">User ID</label>
                    <input id="userId" name="userId" value={formData.userId} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="channel">Channel</label>
                    <select id="channel" name="channel" value={formData.channel} onChange={handleChange} required>
                        <option value="">Select Channel</option>
                        {NOTIFICATION_CHANNELS.map((ch) => (
                            <option key={ch} value={ch}>{ch}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="groupName">Group</label>
                    <select id="groupName" name="groupName" value={formData.groupName} onChange={handleChange}>
                        {NOTIFICATION_GROUPS.map((group) => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="topicName">Topic</label>
                    <select id="topicName" name="topicName" value={formData.topicName} onChange={handleChange}>
                        {NOTIFICATION_TOPICS.map((topic) => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
                        {NOTIFICATION_PRIORITY.map((priority) => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))}
                    </select>
                </div>

                {/* <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange}>
                        {NOTIFICATION_STATUSES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div> */}

                <div className="form-group">
                    <label htmlFor="deepLinkUrl">Deep Link URL</label>
                    <input id="deepLinkUrl" name="deepLinkUrl" value={formData.deepLinkUrl} onChange={handleChange} />
                </div>

                {/* <div className="form-group">
                    <label htmlFor="viewedBy">Viewed By</label>
                    <input id="viewedBy" name="viewedBy" value={formData.viewedBy} onChange={handleChange} />
                </div> */}

                <button type="submit" className="submit-btn" disabled={sending}>{sending ? 'Sending': 'Send Notification'}</button>
            </form>

        </div>
    );
};

export default SendNotificationForm;
