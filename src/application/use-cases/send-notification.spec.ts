
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification";

describe('Enviar notificação', () => {
    it('deve conseguir enviar uma notificação', async () => {
        const notificationRepository = new InMemoryNotificationRepository();

        const sendNotification = new SendNotification(notificationRepository);

        await sendNotification.execute({
            content: "Conteudo",
            category: "social",
            recipientId: "example"
        });

        expect(notificationRepository.notifications).toHaveLength(1);

    });
});