const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Agendamento = require('../models/agendamento');


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
router.get('/selecionar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const agendamento = await Agendamento.find({userId: req.query.userId});

        res.send({agendamentos: agendamento, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/novo', async(req, res) => {
    const {userId} = req.body;
    
    try {
        
        const agendamento = await Agendamento.create(req.body);

    

        return res.send({agendamento, user: req.userId});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'});
    }
});

module.exports = app => app.use('/agendamento', router);