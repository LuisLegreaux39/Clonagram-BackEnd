import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/JsonWebToken'
import { validationResult } from 'express-validator';
import { userEntity } from '../models/Schemas/User.schema'

export const requestValidator = (req: Request, res: Response, next: NextFunction): any => {

    console.log("Validating data")

    let err = validationResult(req);

    if (!err.isEmpty()) {
        return res.status(422).json(err.array());
    } else {
        console.log("Valid data procedding.....")
    }
    next();

}

export const protectedRouteLoginValidator = (req: Request, res: Response, next: NextFunction): any => {
    console.log("Validating access")
    const { authorization } = req.headers;
    // Checking if authorization header is present , if not mandatory to fail
    if (!authorization) {
        return res.status(401).json({ Message: "Should be authenticated to acces this route" })
    }
    authorization.replace('Bearer ', '');

    verifyToken(authorization).then((data) => {

        userEntity.findById(data.userId).then((userData) => {

            req.body = { userData, payload: req.body };

            return next();

        })
    }).catch(() => {

        return res.status(401).json({ Error: "Invalid authentication" });

    })
}