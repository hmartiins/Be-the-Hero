const connection = require('../database/conections');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;
        // generating 4 bytes of hexadecimal characters for the id
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf,
        });

        return response.json({id});
    }
}