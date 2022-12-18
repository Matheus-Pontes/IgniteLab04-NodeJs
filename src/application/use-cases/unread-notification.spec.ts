import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { UnreadNotification } from "./unread-notification";

describe('Não quero Ler notificação', () => {
    it('deve conseguir deixar de ler uma notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository();

        const unreadNotification = new UnreadNotification(notificationRepository);

        const notification =  makeNotification({ readAt: new Date() });

        notificationRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        });

        expect(notificationRepository.notifications[0].readAt).toBeNull();
        
    });
});