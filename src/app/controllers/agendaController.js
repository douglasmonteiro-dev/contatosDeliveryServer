const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Agenda = require('../models/agenda');
const Agendamento = require('../models/agendamento');
const User = require('../models/user');


const router = express.Router();


router.use(authMiddleware);

router.post('/nova', async(req, res) => {
    
    try {
        if (req.body.user.accountType !== 2) 
        return res.status(400).send({error: 'Usuario Sem Permissão'});

        
        const agenda = await Agenda.create(req.body);

    

        return res.send({agenda: agenda, user: req.body.user.id});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro', message: err});
    }
});

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

       
        const agendas = await Agenda.find();
        for (let agenda of agendas) {
            agenda.agendamentos = await Agendamento.find({agendaId: agenda.id});
        }

        res.send({agendas: agendas, user: req.userId});
        
            

        
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
router.delete('/apagar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        await Agenda.findByIdAndDelete(req.query.agendaId);


        res.send();
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});

module.exports = app => app.use('/agenda', router);