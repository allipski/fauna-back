import { AuthenticatedRequest } from "./authMiddleware";
import { NextFunction, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";

export async function validateIndividualInput(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const individualSchema = Joi.object({
        name: Joi.string().required().trim().min(1),
        geocode: Joi.string().required().trim().min(1),
        age: Joi.number().required(),
        gender: Joi.string().required().trim().min(1).valid("Fêmea", "Macho"),
        onRehab: Joi.boolean(),
        natureReady: Joi.boolean(),
        img: Joi.string().required().trim().min(1).max(2000),
        speciesId: Joi.number().required()
      });

    const joiValidation = individualSchema.validate(req.body, {abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }
    
    return next();
}