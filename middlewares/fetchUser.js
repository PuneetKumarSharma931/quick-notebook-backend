const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next)=>{

    try {
        
        const token = req.header('auth-token');

        if(!token) {

            res.status(401).json({success: false, msg: "Please verify using a valid token!"});
        }
        else {

            const data = jwt.verify(token, "PuneetKumarSharma");
            req.user = data.user;
            next();
        }

    } catch (error) {
        
        res.status(401).json({success: false, msg: "Please verify using a valid token!"});
    }
}

module.exports = fetchUser;