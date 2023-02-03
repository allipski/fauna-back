import { AuthenticatedRequest } from "./authMiddleware";
import { NextFunction, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";

export async function validateSpeciesInput(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const speciesSchema = Joi.object({
        name: Joi.string().required().trim().min(1),
        location: Joi.string().required().trim().min(1),
        status: Joi.string().required().trim().min(1).valid("Levemente ameaçado", "Moderadamente ameaçado", "Severamente ameaçado"),
        description: Joi.string().required().trim().min(1).max(500),
        img: Joi.string().required().trim().min(1).max(2000),
        projectId: Joi.number().required()
      });

    const joiValidation = speciesSchema.validate(req.body, {abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }
    
    return next();
}