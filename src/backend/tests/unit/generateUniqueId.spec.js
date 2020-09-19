const generateUniqueId = require('../../src/utils/GenerateUniqueId');

describe('Generate Unique ID', () => { // -> descrever o nome do teste
    it('shoud generate an unique ID', () => { // 'Isso deveria gerar um único ID'
        const id = generateUniqueId();

        expect(id).toHaveLength(8); // Espera-se que o id tenha 8 números
    });
    
});
