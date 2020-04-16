const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')


describe('Users', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new User', async () => {
        const response = await request(app)
        .post('/users')
        .send({
            name:"Luis1",
            email:"lusi@gmail.com",
            password:"444444",
            whatsapp:"11111111111",
            type:"AB-",
            city:"salvador",
            uf:"BA"
        });
        
        expect(response.body);
        
    })
})