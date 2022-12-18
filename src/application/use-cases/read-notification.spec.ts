import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { ReadNotification } from "./read-notification";

describe('Ler notificação', () => {
    it('deve conseguir ler uma notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository();

        const readNotification = new ReadNotification(notificationRepository);

        const notification =  makeNotification();

        notificationRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id
        });

        expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date));
        
    });
});