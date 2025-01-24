import CatchAsync from "../../utils/CatchAsync"

const createUserController = CatchAsync(async (req,res)=>{
    // const result = await UserService.createUserService(req.body)
    // sendResponce(res,{
    //     statusCode:201,
    //     success:false,
    //     message:"User registered successfully",
    //     data:result
    // })
})

export const userController = {
    createUserController
}