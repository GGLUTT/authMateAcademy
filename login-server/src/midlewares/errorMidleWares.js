

export const errorMiddleWare  = (error, req, res, next) => {
   if(error){
    res.statusCode = 500
     res.send({
      message: 'Server Error',
   })
}


next();

}
