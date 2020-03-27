const conn = require("../db/connection")

module.exports = {

    async index(request,response){
        const ongid = request.headers.authorization;
        const cases = await conn('cases').where("ongId",ongid).select("*");
        return response.send(cases);
    },

}