import { Content } from "src/domain/entities/content";
import { Notification, INotification } from "src/domain/entities/notification";

type Override = Partial<INotification>

export function makeNotification(override : Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Nova mensagem !!! '),
        recipientId: 'recipient2',
        ...override
    }) 
}