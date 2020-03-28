const express = require('express');
const crypto = require('crypto');

const OngController = require('./controllers/ongController')
const CaseController = require('./controllers/caseController')
const ProfileController = require('./controllers/profileController')
const SessionController = require('./controllers/sessionController')

const routes = express.Router();

routes.post("/ongs",OngController.create);
routes.get('/ongs', OngController.list);

routes.get("/profile",ProfileController.index);

routes.post("/sessions",SessionController.create);

routes.post("/cases",CaseController.create);
routes.get('/cases', CaseController.index);
routes.delete('/cases/:id',CaseController.delete);
routes.delete('/cases/',CaseController.deleteAll);


routes.get('/',(request,response) =>{
    const rquery = request.query;
    const rparams = request.params;
    const rbody = request.body;
    console.log(rparams);
    console.log(rquery);
    console.log(rbody);

    return response.send("Show");
});

module.exports = routes;