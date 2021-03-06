const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId')
const crypto = require('crypto')
module.exports = {

    async create(request, response) {
        const { nameU, email, password, whatsapp, type, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX'); //generateUniqueId;

        const situação = await connection('users').insert({
            id,
            nameU,
            email,
            password,
            whatsapp,
            type,
            city,
            uf,
        })
        if (situação > 0) {
            return response.json({ email, password });
        }
        else {
            return response.status(400).send();
        }
    },

    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    }
};