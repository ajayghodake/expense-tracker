import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generating the token
const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE,}
    )
};

// Regestring new user
export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        // Check user is exist
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({success: false, message: 'Email already registered'});
        }

        // Creating new user
        const user = await User.create({name, email, password});

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });

    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

    // Check user is exist
    const user = await User.findOne({email});
    if(!user) {
        return res.status(401).json({success: false, message: 'Invalid User email'});
    }

    // Check Password
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({success: false, message: 'Invalid Password'});
    }

    const token = generateToken(user._id);

    res.json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};


// Getting Current User
    export const getMe = async (req, res) => {
        try{
            const user = await User.findById(req.user.id).select('-password');
            res.json({success: true, user});
        } catch(error) {
            res.status(500).json({success: false, message: error.message});
        }
    };