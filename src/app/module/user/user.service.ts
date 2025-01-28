import httpStatus from "http-status"
import App__error from "../../Error/App__Error"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserService = async (payload: TUser) => {
    const isUserExist = await User.findOne({ email: payload.email })
    if (isUserExist) {
        throw  new App__error(httpStatus.CONFLICT,'This user has already been used.');
    }

    // Create the user
    const newUser = await User.create(payload);
    //    send response 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, role, _id, ...result } = newUser.toObject()
    return result
}

export const Userservice = {
    createUserService
}