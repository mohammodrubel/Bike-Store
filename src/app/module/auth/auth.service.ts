import bcrypt from 'bcrypt'
import httpStatus from "http-status"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config"
import App__error from "../../Error/App__Error"
import { TUser } from "../user/user.interface"
import { User } from "../user/user.model"


const loginUser = async (payload: Partial<TUser>) => {
  const existingUser = await User.findOne({ email: payload.email })

  if (!existingUser) {
    throw new App__error(httpStatus.NOT_FOUND, 'this user is not found')
  }
  console.log(existingUser)
  const plainPassword = payload.password
  const userHashPassword = existingUser?.password
  const isPasswordValid = await bcrypt.compare(plainPassword as string, userHashPassword);
  if (!isPasswordValid) {
    throw new App__error(httpStatus.UNAUTHORIZED, 'Invalid credentials.');
  }

  const jwtPayload = {
    id: existingUser._id,
    name: existingUser.name,
    role: existingUser.role,
    email: existingUser.email,
  };

  // Generate tokens
  const accessToken = jwt.sign(jwtPayload, config.jwt__access__token__secret as string, { expiresIn: '1d' });
  const refreshToken = jwt.sign(jwtPayload, config.jwt__refresh__token__secret as string, { expiresIn: '3d' });
  // Return tokens
  return {
    accessToken,
    refreshToken,
  };

}




const refreshTokenService = async (token: string) => {
  if (!token) {
    throw new App__error(httpStatus.UNAUTHORIZED, 'you are not Authorized')
  }
  // check token is verify
  const decoded = jwt.verify(
    token,
    config.jwt__refresh__token__secret as string,
  ) as JwtPayload
  const { email } = decoded

  const user = await User.findOne({ email: email })
  if (!user) {
    throw new App__error(httpStatus.NOT_FOUND, 'user not found')
  }

  //create token and send to user
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    isBlocked: user?.isBlocked,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt__refresh__token__secret as string, { expiresIn: '1d' });

  return {
    accessToken
  }
}

export const authService = {
  loginUser,
  refreshTokenService
}