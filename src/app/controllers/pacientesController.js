const express = require('express');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/user');


const router = express.Router();


router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const [pacientes] = await User.find({accountType: 1});
        console.log(JSON.stringify([pacientes]));

        res.send({pacientes: [pacientes], user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});
router.get('/seleciomar', async(req, res) => {
    try {
        const user = await User.findById(req.userId).select();
        console.log(JSON.stringify(user));

        if (user.accountType == 1)
        return res.status(400).send({error: 'Usuario Paciente'});

       
        const [pacientes] = await User.find({accountType: 1});
        console.log(JSON.stringify([pacientes]));

        res.send({pacientes: [pacientes], user: req.userId});
        
            
           
        
    } catch (err) {
        res.status(400).send({ error: err});
    }
});

module.exports = app => app.use('/pacientes', router);