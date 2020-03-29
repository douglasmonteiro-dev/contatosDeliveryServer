const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');
const Estabelecimento = require('../models/estabelecimento');


const router = express.Router();


router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

       
        const estabelecimentos = await Estabelecimento.find();
        console.log(JSON.stringify(estabelecimentos));

        res.send({estabelecimentos: estabelecimentos, user: req.userId});
        
            

        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.get('/selecionar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));
       
        const estabelecimento = await User.findOne({accountType: 1, _id: req.query.userId});
        const dados = await Estabelecimento.findOne({userId: req.query.userId});

        res.send({usuarioEstabelecimento: estabelecimento, dadosEstabelecimento: dados, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});

router.post('/novo', async(req, res) => {
    const {nome} = req.body;
    
    try {
        if (await Estabelecimento.findOne({nome}))
        return res.status(400).send({error: 'Estabelecimento Ja existe'});
        
        const estabelecimento = await Estabelecimento.create(req.body);
        

        return res.send({estabelecimento, user: req.userId});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro', message: err});
    }
});
router.put('/atualizar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1  && user.id !== req.query.userId)
        return res.status(400).send({error: 'Usuario Estabelecimento'});

       
        await Estabelecimento.findByIdAndUpdate(req.body.dadosEstabelecimento._id, {
            '$set': {
                endereco: req.body.dadosEstabelecimento.endereco,
                lat: req.body.dadosEstabelecimento.lat,
                lng: req.body.dadosEstabelecimento.lng,
                celular: req.body.dadosEstabelecimento.celular,
                telefone: req.body.dadosEstabelecimento.telefone,
                nomeCartao: req.body.dadosEstabelecimento.nomeCartao,
                numeroCartao: req.body.dadosEstabelecimento.numeroCartao,
                mesCartao: req.body.dadosEstabelecimento.mesCartao,
                anoCartao: req.body.dadosEstabelecimento.anoCartao,
                cvvCartao: req.body.dadosEstabelecimento.cvvCartao
            }
        });


        res.send({usuarioEstabelecimento: req.body.usuarioEstabelecimento, dadosEstabelecimento: req.body.dadosEstabelecimento, user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.delete('/apagar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Estabelecimento'});

       
        await User.findByIdAndDelete(req.query.userId);


        res.send();
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.post('/atualizar_perfil', async(req, res) => {
    const {userId} = req.body;
    
    try {
        if (await Estabelecimento.findOne({userId}))
        return res.status(400).send({error: 'Usuario Ja existe'});

        req.body.accountType = 1;
        
        const user = await User.create(req.body);

        user.password = undefined;
    

        return res.send({user, token: generateToken({id: user.id})});
    } catch (err) {
        res.status(400).send({ error: 'Falha no Registro'});
    }
});

module.exports = app => app.use('/estabelecimentos', router);