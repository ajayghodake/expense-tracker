import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    try{

        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({success: false, message: 'Not Authorized, No Token'})
        }


        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decode); // ADD THIS
        req.user = await User.findById(decode.id).select('-password');
        console.log('User:', req.user); // ADD THIS

        if(!req.user){
            return res.status(401).json({success: false, message: 'User not found'});
        }
        console.log('req.user set to:', req.user);
        next();

    } catch(error){
        return res.status(401).json({success: false, message: 'Not Authorized, No Token'});
    }
};

export default protect;