const TokenModel = require('../models/token');
const jwt = require('jsonwebtoken');


function authenticateToken( request, response, next){
    
    const authorizationHeader = request.headers['authorization'];

    if(!authorizationHeader){
        response.status(401).send({
            message: "This is a protected resource. Please login first."
        });
        return;
    }

    const token = authorizationHeader.split(" ").pop()
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, ( err, payload ) => {
        if( err ){
            response.status(401).send({
                error: 401,
                message: "This is a protected resource.  Please login first."
            })
            return;
        }

        next();

    });
}

module.exports = {
    authenticateToken
}