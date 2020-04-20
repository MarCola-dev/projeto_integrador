const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { email, password } = request.body;
        

        const user = await connection('users').where({
        'email': email,
        'password': password
        })
        .select('*')
        .first();

        if(!user){
            return response.status(400).json({ error: 'Não foi encontrado um usuário com esses dados'});
        }

        return response.json(user);
    }
}