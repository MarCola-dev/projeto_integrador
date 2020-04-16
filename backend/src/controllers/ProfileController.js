const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const users_id = request.headers.authorization;
        
        const cases = await connection('cases').where('users_id',users_id)
            .select('*');
    
        return response.json(cases);
    }
}