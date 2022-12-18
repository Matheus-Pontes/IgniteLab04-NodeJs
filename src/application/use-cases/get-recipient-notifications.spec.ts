import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Buscando todas as notificações', () => {
    it('deve conseguir contar as notificações', async () => {
        const notificationRepository = new InMemoryNotificationRepository();

        const getRecipientNotifications = new GetRecipientNotifications(notificationRepository);

        notificationRepository.create(makeNotification({ recipientId: "recipient-1"}));

        notificationRepository.create(makeNotification({ recipientId: "recipient-1"}));

        notificationRepository.create(makeNotification({ recipientId: "recipient-2"}));

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: "recipient-1"
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1'}),
            expect.objectContaining({ recipientId: 'recipient-1'})
        ]))
    });
});