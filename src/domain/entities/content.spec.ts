import { Content } from "./content";

describe('Testando conteúdo das notificações', () => {
    test('Deve ser possível criar um conteúdo de uma notificação', () => {
        const content = new Content('VocÊ ganhou um novo seguidor !!! ');
        expect(content).toBeTruthy();
    });
    
    test('Não deve ser possível criar um conteúdo para uma notificação com menos de 5 caracteres', () => {
        expect(() => new Content('aaa')).toThrow();
    });
    
    test('Não deve ser possível criar um conteúdo para uma notificação com mais de 240 caracteres', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});
