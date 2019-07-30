const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Agendamento = require('../models/agendamento');
const Agenda = require('../models/agenda')


const router = express.Router();


router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const agendamento = await Agendamento.find();

        res.send({agendamentos: agendamento, user: req.userId});
        
            

        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.get('/dias-disponiveis', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));


        const agendas = await Agenda.find({inicio:{$lte: req.query.inicio}, fim: {$gte: req.query.fim}});
        

        res.send({agendas: agendas, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.get('/agendas-disponiveis', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        const dia = new Date(req.query.dia);
        let agendas = await Agenda.find({inicio:{$lte: req.query.dia}, fim: {$gte: req.query.dia}})
        for (let agenda of agendas) {
            agenda.agendamentos = await Agendamento.find({agendaId: agenda.id});
        }
        

        res.send({agendas: agendas, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/agendar', async(req, res) => {
    
    try {
        const user = await User.findById(req.userId).select();
        
        
        if (user.isNutri()) {
            return res.status(400).send({error: 'Usuario Nutricionista'});
        }

        const agendamento = await Agendamento.create(req.body);

    

        return res.send({agendamento, user: req.userId});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'});
    }
});

module.exports = app => app.use('/agendamento', router);