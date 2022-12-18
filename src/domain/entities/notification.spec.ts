import { Content } from "./content";
import { Notification } from "./notification";

describe('Testando criação de notificação', () => {
    test('Criando uma notificação', () => {

        const notification = new Notification({
            content: new Content('Nova solicitação de amizade'),
            category: 'social',
            recipientId: 'example-recipient-id'
        });
        
        expect(notification).toBeTruthy();
    });
    
    test('Não deve ser possível criar um conteúdo para uma notificação com menos de 5 caracteres', () => {
        expect(() => new Content('aaa')).toThrow();
    });
    
    test('Não deve ser possível criar um conteúdo para uma notificação com mais de 240 caracteres', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});
