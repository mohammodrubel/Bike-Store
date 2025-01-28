import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ROLE__TYPE } from "../app/interface/roleType";
import { User } from "../app/module/user/user.model";
import config from "../app/config";
import App__error from "../app/Error/App__Error";
import CatchAsync from "../app/utils/CatchAsync";

const auth = (...requiredRoles: ROLE__TYPE[]) => {
    return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // Check if token is present in Authorization header
        const token = req.headers.authorization;
        if (!token) {
            throw new App__error(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        // Extract the Bearer token from the header
        const Bearertokens = token.split(' ')[1];
        if (!Bearertokens) {
            throw new App__error(httpStatus.UNAUTHORIZED, "Token format is incorrect.");
        }

        // Try to verify the token
        let decoded;
        try {
            decoded = jwt.verify(Bearertokens, config.jwt__access__token__secret as string) as JwtPayload;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            throw new App__error(httpStatus.UNAUTHORIZED, "Invalid token signature.");
        }

      
        // Extract role and id from decoded token
        const { role, id } = decoded;

        // Check if user exists in the database
        const user = await User.findById(id);
        if (!user) {
            throw new App__error(httpStatus.NOT_FOUND, 'User not found.');
        }

        // Check if user has the required role
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new App__error(httpStatus.UNAUTHORIZED, 'You are not authorized!');
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Call next middleware or route handler
        next();
    });
};

export default auth;
