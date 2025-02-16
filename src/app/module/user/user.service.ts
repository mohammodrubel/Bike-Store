import bcrypt from 'bcrypt'
import httpStatus from "http-status"
import { JwtPayload } from "jsonwebtoken"
import App__error from "../../Error/App__Error"
import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserService = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email })
  if (isUserExist) {
    throw new App__error(httpStatus.CONFLICT, 'This user has already been used.');
  }

  // Create the user
  const newUser = await User.create(payload);
  //    send response 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, role, _id, ...result } = newUser.toObject()
  return result
}

const changePasswordService = async (payload: { oldPassword: string, newPassword: string }, user: JwtPayload) => {
  const isValidUser = await User.findOne({
    _id: user.id,
    isBlocked: false
  });



  if (!isValidUser) {
    throw new App__error(httpStatus.NOT_FOUND, 'No user found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    isValidUser.password,
  );

  if (!isPasswordMatched) {
    throw new App__error(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  isValidUser.password = payload.newPassword;
  await isValidUser.save();
}


export const Userservice = {
  createUserService,
  changePasswordService,
}