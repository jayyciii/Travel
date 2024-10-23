const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const JWL_SECRET = process.env.NEXT_PUBLIC_JWL_SECRET_KEY;


const generateToken = async (userId) => {

    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const token = jwt.sign({ userId: user._id, role: user.role },JWL_SECRET,{expiresIn : '1h'})
        return token;

    } catch (error) {
        console.error("Error generation token", error);
        throw error;
    }
}

module.exports = generateToken;