import { AuthenticatedRequest } from "./authMiddleware";
import { NextFunction, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";

export async function validateSignInInput(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const loginSchema = Joi.object({
        email: Joi.string().email().required().trim().min(1),
        password: Joi.string().required().trim().min(1),
      });

    const joiValidation = loginSchema.validate(req.body, {abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }
    
    return next();
}