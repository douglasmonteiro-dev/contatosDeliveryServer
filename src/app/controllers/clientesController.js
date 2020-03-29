const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Cliente = require('../models/cliente');


const router = express.Router();


router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Cliente'});

       
        const clientes = await User.find({accountType: 1});
        console.log(JSON.stringify(clientes));

        res.send({clientes: clientes, user: req.userId});
        
            

        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.get('/selecionar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1 && user.id !== req.query.userId)
        return res.status(400).send({error: 'Usuario Cliente'});

       
        const cliente = await User.findOne({accountType: 1, _id: req.query.userId});
        const dados = await Cliente.findOne({userId: req.query.userId});

        res.send({usuarioCliente: cliente, dadosCliente: dados, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.put('/atualizar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1  && user.id !== req.query.userId)
        return res.status(400).send({error: 'Usuario Cliente'});

       
        await Cliente.findByIdAndUpdate(req.body.dadosCliente._id, {
            '$set': {
                endereco: req.body.dadosCliente.endereco,
                lat: req.body.dadosCliente.lat,
                lng: req.body.dadosCliente.lng,
                celular: req.body.dadosCliente.celular,
                telefone: req.body.dadosCliente.telefone,
                nomeCartao: req.body.dadosCliente.nomeCartao,
                numeroCartao: req.body.dadosCliente.numeroCartao,
                mesCartao: req.body.dadosCliente.mesCartao,
                anoCartao: req.body.dadosCliente.anoCartao,
                cvvCartao: req.body.dadosCliente.cvvCartao
            }
        });


        res.send({usuarioCliente: req.body.usuarioCliente, dadosCliente: req.body.dadosCliente, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.delete('/apagar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Cliente'});

       
        await User.findByIdAndDelete(req.query.userId);


        res.send();
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/atualizar_perfil', async(req, res) => {
    const {userId} = req.body;
    
    try {
        if (await Cliente.findOne({userId}))
        return res.status(400).send({error: 'Usuario Ja existe'});

        req.body.accountType = 1;
        
        const user = await User.create(req.body);

        user.password = undefined;
    

        return res.send({user, token: generateToken({id: user.id})});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'});
    }
});

module.exports = app => app.use('/clientes', router);