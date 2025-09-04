const userModel = require('../models/user_models');




module.exports.createUser = async({ firstname, lastname, email, password }) => {
    if(!firstname || !email || !password){
        throw new Error('First name, email and password are required');
    }   
    const user = await userModel.create({
        fullName: { firstName: firstname, lastName: lastname },
        email,
        password
    })

    return user;
}