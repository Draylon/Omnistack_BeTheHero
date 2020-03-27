
const conn = require("../db/connection")

module.exports = {
    async create(Request,response){
        const id = crypto.randomBytes(4).toString("HEX");
        const {name,email,whatsapp,city,UF} = request.body;
        
        await conn('ongs').insert({
            id,name,email,whatsapp,city,UF
        });
        return response.json({id});
    },
    async list(request,response){
        const ongs = await conn('ongs').select("*");
        return response.send(ongs);
    }
}