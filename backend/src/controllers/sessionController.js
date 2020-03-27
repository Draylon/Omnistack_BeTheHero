const conn = require("../db/connection")

module.exports = {

    async create(request,response){
        const { id } = request.body;
        const ong = await conn('ongs').where('id',id).select('name').first();
        if(!ong)
            return response.status(400).json({error: "No ong found!"})
        return response.json(ong);
    }
}