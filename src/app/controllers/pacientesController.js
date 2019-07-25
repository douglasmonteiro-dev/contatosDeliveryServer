const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Paciente = require('../models/paciente');


const router = express.Router();


router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const pacientes = await User.find({accountType: 1});
        console.log(JSON.stringify(pacientes));

        res.send({pacientes: pacientes, user: req.userId});
        
            

        
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

       
        const paciente = await User.findOne({accountType: 1, _id: req.query.userId});
        const dados = await Paciente.findOne({userId: req.query.userId});

        res.send({usuarioPaciente: paciente, dadosPaciente: dados, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/atualizar_perfil', async(req, res) => {
    const {userId} = req.body;
    
    try {
        if (await Paciente.findOne({userId}))
        return res.status(400).send({error: 'Usuario Ja existe'});

        req.body.accountType = 1;
        
        const user = await User.create(req.body);

        user.password = undefined;
    

        return res.send({user, token: generateToken({id: user.id})});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'});
    }
});

module.exports = app => app.use('/pacientes', router);