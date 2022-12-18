
import { Content } from "src/domain/entities/content";
import { Notification } from "src/domain/entities/notification";
import { makeDocument } from "@prisma/client/runtime";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Contando notifications por pessoa', () => {
    it('deve conseguir contar as notificações', async () => {
        const notificationRepository = new InMemoryNotificationRepository();

        const countRecipientNotification = new CountRecipientNotification(notificationRepository);

        notificationRepository.create(makeNotification({ recipientId: "recipient-1"}));

        notificationRepository.create(makeNotification({ recipientId: "recipient-1"}));

        notificationRepository.create(makeNotification({ recipientId: "recipient-2"}));

        const { count } = await countRecipientNotification.execute({
            recipientId: "recipient-1"
        });

        expect(count).toEqual(2);
    });
});