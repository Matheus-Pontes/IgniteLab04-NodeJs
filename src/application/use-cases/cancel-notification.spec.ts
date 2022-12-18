
import { Content } from "src/domain/entities/content";
import { Notification } from "src/domain/entities/notification";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";

describe('Cancelar notificação', () => {
    it('deve conseguir cancelar uma notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository();

        const cancelNotification = new CancelNotification(notificationRepository);

        const notification =  new Notification({
            category: 'social',
            content: new Content('nova solicitação para cancelar..'),
            recipientId: 'example'
        });

        notificationRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        });

        expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
        
    });
});