import { ApiError } from "../exeption/api.error.js";
import { User } from "../models/user.js";
import { emailService } from "../services/email.service.js";
import {v4 as uuidv4} from 'uuid'


 function getAllActive(){
  return User.findAll({
    where: {activationToken: null}
  })
}


function normalize ({id, email}) {
   return {id, email}
}

function findByEmail (email) {
  return User.findOne({
    where: {email}
  })
}

async function  register  (){
  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
}


    const activationdToken = uuidv4()

    const existUser = await findByEmail(email)

    if(existUser){
      throw ApiError.badRequest({
        email: 'User already exist'
      })
    }

     await User.create({ email, password });
    await emailService.sendActivationEmail(email,activationdToken)
}

export const userService = {
  getAllActive,
  normalize,
  findByEmail,
  register
}