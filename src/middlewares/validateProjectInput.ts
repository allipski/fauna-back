import { AuthenticatedRequest } from "./authMiddleware";
import { NextFunction, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";

export async function validateProjectInput(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const projectSchema = Joi.object({
        name: Joi.string().required().trim().min(1),
        description: Joi.string().required().trim().min(1).max(500),
        img: Joi.string().required().trim().min(1).max(2000)
      });

    const joiValidation = projectSchema.validate(req.body, {abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }
    
    return next();
}