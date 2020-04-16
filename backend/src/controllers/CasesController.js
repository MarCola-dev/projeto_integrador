const connection = require('../database/connection');

module.exports = {
   
   
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('cases').count()

        const cases = await connection('cases')
            .join('users', 'users.id', '=', 'cases.users_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
            'users.*', 
            'users.name', 
            'users.email', 
            'users.whatsapp', 
            'users.city', 
            'users.uf'
        ]);
        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(cases);
    },


    async create(request, response) {
        const { title, description, name, type, city, uf } = request.body;
        request.headers;
        const users_id = request.headers.authorization;

        const [id] = await connection('cases').insert({
            title,
            description,
            name, 
            type, 
            city, 
            uf,
            users_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const users_id = request.headers.authorization;

        const cases = await connection('cases')
            .where('id', id)
            .select('users_id')
            .first();

            if (cases.users_id !== users_id) {
                return response.status(401).json({ error: 'Operation not permitted.' })
            }

            await connection('cases').where('id', id).delete()

            return response.status(204).send();
    }

};