import express from 'express'
import { userController } from '../controllers/user.controller.js'  
import { authMiddleWare } from '../midlewares/authMidleWares.js'
export const userRouter = new express.Router()  


userRouter.get('/', authMiddleWare, userController.getAllActiveUser)
