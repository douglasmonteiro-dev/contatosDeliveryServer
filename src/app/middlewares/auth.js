const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
if(req.method !== 'OPTIONS') {
        const authHeader = req.headers.authorization;

        if(!authHeader)
            return res.status(401).send( {error: 'Token não informado'});

        const parts = authHeader.split(' ');
        if (!parts.length === 2)
            return res.status(401).send( {error: 'Token error'});

        const [ scheme, token ] = parts;

        if (scheme !== 'Bearer')
            return res.status(401).send({error: 'Token malformated'});

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({error: 'Token Invalid'});

        req.userId = decoded.id;
        });
    }

return next();
    
};