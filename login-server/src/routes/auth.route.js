import express from 'express'
import { authController } from '../controllers/auth.controller.js'
import { catchError } from '../utils/catchError.js'

export const authRouter = new express.Router()



authRouter.post('/registration' ,catchError(authController.registration))
authRouter.get('/activation/:activationdToken' ,catchError(authController.activate))
authRouter.post('/login', catchError(authController.login))