const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Agendamento = require('../models/agendamento');
const Agenda = require('../models/agenda');
const mailer = require('../../modules/mailer');
const moment = require('moment');



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
router.get('/meus-agendamentos', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

            const agendamentos = await Agendamento.find({userId: req.userId});
        

        res.send({agendamentos: agendamentos, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/agendar', async(req, res) => {
    
    try {
        const user = await User.findById(req.userId).select();
        const agenda = await Agenda.findById(req.body.agendaId).select();
        const profissional = await User.findById(agenda.userId).select();
        
        
        if (user.accountType == 2) {
            return res.status(400).send({error: 'Usuario Nutricionista'});
        }
        req.body = {...req.body, userId: user.id, nome: user.name, profissional: profissional.name};
        let agendamento = await Agendamento.create(req.body);

        agendamento.frendlyData = moment(agendamento.data).locale('pt-BR');

        mailer.sendMail({
            to: user.email,
            from: 'Tatiane Ribeiro Nutricionista',
            subject: 'AGENDAMENTO DE CONSULTA',
            template: 'auth/agendado',
            context: {agendamento}
        }, (err) => {
            if(err)
                return res.status(400).send({error: 'Não consigo enviar email'});
            return res.send();
        })

        return res.send({agendamento, user: req.userId});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'}, err);
    }
});
router.delete('/apagar', async(req, res) => {
    try {
        const agendamento = await Agendamento.findById(req.query.agendamentoId).select();
        console.log(JSON.stringify(agendamento));

        if (req.userId !== agendamento.userId)
        return res.status(400).send({error: 'Consulta de outro Paciente'});

       
        await Agendamento.findByIdAndDelete(req.query.agendamentoId);


        res.send();
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});

module.exports = app => app.use('/agendamento', router);