import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repository/notifications-repository";

interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {

    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificationId } = request;
        
        const notification = await this.notificationsRepository.findById(notificationId);

        if(!notification)
            throw new Error('Not found Notification !!!');

        notification.Cancel();

        await this.notificationsRepository.save(notification);
        
    }
}