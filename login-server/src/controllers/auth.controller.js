 
 import { User } from "../models/user.js"
import { emailService } from "../services/email.service.js";
import {v4 as uuidv4} from 'uuid'
import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";
 const registration = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: 'Email and password are required' });
    }

    try {
        const activationdToken = uuidv4()

        const newUser = await User.create({ email, password });
        await emailService.sendActivationEmail(email,activationdToken)
        res.status(201).send(newUser);
    } catch (err) {
        res.status(500).send({ message: 'Server error', error: err.message });
    }


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