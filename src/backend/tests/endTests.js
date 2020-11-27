const connection = require('../src/database/connection');

afterAll(() => connection.destroy());
