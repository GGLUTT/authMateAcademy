 
 import { User } from "../models/user.js"

import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";
import { ApiError } from "../exeption/api.error.js";


function validateEmail(value) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

function validatePassword(value) {
  if (!value) {
    return 'Password is required';
  }
    
  if (value.length < 6) {
    return 'At least 6 characters';
  }
};

 const registration = async (req, res) => {
    const { email, password } = req.body;

     const errors  = {
      email: validateEmail(email),
      password: validatePassword(password)
     }

     if(errors.email || errors.password){
        throw ApiError.badRequest('Bad request' , errors)
     }

     await userService.register(email, password)


        res.status(201).send({
            message:'OK'
        });
  
        // res.status(500).send({ message: 'Server error', error: err.message });


};


const activate = async (req, res) => {

    const {activationdToken} = req.params;

    const user = await User.findOne({
         where: {activationdToken}
    })

    if(!user){
        res.sendStatus(404)
        return
    }
 

    user.activationdToken = null
    user.save();

    return res.send(user)
} 

const login = async(req, res) => {
    const {email, password} = req.body

    const user =  await userService.findByEmail(email)

    if(!user || user.password !== password){
      res.send(401)
      return
    }


    const normalizeUser = userService.normalize(user)
  const accesToken = jwtService.sign(normalizeUser)

  res.send({
    user:normalizeUser,
    accesToken,
  })
    
}




export const authController = {
    registration,
    activate,
    login,
} 