import { Injectable } from "@nestjs/common";
import { Content } from "../../domain/entities/content";
import { Notification } from "../../domain/entities/notification";
import { NotificationsRepository } from "../repository/notifications-repository";

interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification;
}

@Injectable()
export class SendNotification {

    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recipientId, content, category } = request;
        
        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        });

        await this.notificationsRepository.create(notification);

        return { 
            notification
        };
    }
}