const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next)=> {
    const authHeaders = req.headers.autorization;

    if (!authHeaders){
        res.status(401).send({ error: 'No Token Provided'});
    }

    const parts = authHeaders.split(' ');

    if(!parts.length === 2){
        res.status(401).send({error: 'Invalid Token'});
    }

    const[ scheme, token ] = parts;

    if(!/^Bearer/i.test(scheme)){
        return res.status(401).send({error: 'Token malformatted'});
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err){
            res.status(401).send({error: 'Invalid Token'});
        }

        req.userId = decoded.id;
        return next();
    });
};
