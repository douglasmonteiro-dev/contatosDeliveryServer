const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Agenda = require('../models/agenda');


const router = express.Router();


router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const agenda = await Agenda.find();

        res.send({agendas: agenda, user: req.userId});
        
            

        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.get('/selecionar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const agenda = await Agenda.find({userId: req.query.userId});

        res.send({agendas: agenda, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/nova', async(req, res) => {
    const {userId} = req.body;
    
    try {
        
        const agenda = await Agenda.create(req.body);

    

        return res.send({agenda, user: req.userId});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'});
    }
});

module.exports = app => app.use('/agenda', router);