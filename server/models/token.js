const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const TokenModel = {

    generateAccessToken: ( payload ) => {
        return jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
    },

    validateToken: ( token, err, payload ) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, ( err, payload ) => {
            
            if( err ){
                onError(err);
                return;
            }

            onSuccess(payload);

        });
    }

}

module.exports = {
    TokenModel
}