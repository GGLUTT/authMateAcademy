 
 import { User } from "../models/user.js"

import { userService } from "../services/user.service.js";
import { jwtService } from "../services/jwt.service.js";
 const registration = async (req, res) => {
    const { email, password } = req.body;


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