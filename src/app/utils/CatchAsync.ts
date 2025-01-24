import { Request, RequestHandler, Response, NextFunction } from "express";

const CatchAsync = (myFunction: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(myFunction(req, res, next)).catch(err => next(err));
  };
};

export default CatchAsync