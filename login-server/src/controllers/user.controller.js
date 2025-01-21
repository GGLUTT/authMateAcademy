import { userService } from "../services/user.service.js"

 



const getAllActiveUser = (req, res) => {
   const users = userService.getAllActive()


   res.send(
    users.map(userService.normalize)

   )
}

export const userController = {
    getAllActiveUser 
} 