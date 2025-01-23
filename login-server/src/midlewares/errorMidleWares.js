import { ApiError } from "../exeption/api.error.js";


export const errorMiddleWare  = (error, req, res, next) => {

  if(error instanceof ApiError){
    res.status(error.status).send({
      message: error.message,
      errors: error.errors
    })
  }
   if(error){
    res.statusCode = 500
     res.send({
      message: 'Server Error',
   })
}


next();

}
