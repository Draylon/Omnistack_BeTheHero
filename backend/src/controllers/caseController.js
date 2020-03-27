const conn = require("../db/connection")

module.exports = {
    async create(request,response){
        const{title,desc,value} = request.body;
        const ongId = request.headers.authorization;

        const [id] = await conn('cases').insert({title,desc,value,ongId})
        return response.json({id});
    },
    async index(request,response){
        const {page = 1} = request.query;

        const [count] = await conn('cases').count();

        const cases = await conn('cases')
        .join('ongs','ongs.id',"=",'cases.ongId')
        .limit(5)
        .offset((page-1)*5)
        .select(["cases.*","ongs.name","ongs.email","ongs.whatsapp","ongs.city","ongs.uf","ongs.id AS sepp_ongid"]);
        response.header("X-Total-Count",count['count(*)']);
        return response.send(cases);
    },
    async delete(request,response){
        const {id} = request.params;
        const ongId = request.headers.authorization;
        const caseOng = await conn('cases')
            .where('id',id)
            .select('ongId').first();


        if(caseOng.ongId !== ongId)
            return response.status(401).json({error: "Not Allowed!"});

        await conn('cases').where('id',id).delete();
        return response.status(204).send();
    },
    async put(request,response){
        
    },
    async deleteAll(request,response){
        const {id} = request.params;
        const ongId = request.headers.authorization;
        const caseOng = await conn('cases')
            .where('id',id)
            .select('ongId').first();


        if(caseOng.ongId !== ongId)
            return response.status(401).json({error: "Not Allowed!"});

        await conn('cases').where('ongId',caseOng.ongId).delete();
        return response.status(204).send();
    }
};