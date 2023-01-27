import { AuthenticatedRequest } from "./authMiddleware";
import { NextFunction, Response } from "express";
import organizationsRepository from "@/repositories/organizationsRepository";
import Joi from "joi";
import httpStatus from "http-status";

export async function validateSignupInput(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const {
        email: email,
        password: password,
      } = req.body;

    const userSchema = Joi.object({
        name: Joi.string().required().trim().min(1),
        email: Joi.string().email().required().trim().min(1),
        password: Joi.string().required().trim().min(1),
        confirmPassword: Joi.string().valid(password).required().trim().min(1)
      });

    const joiValidation = userSchema.validate(req.body, {abortEarly: false});

    if(joiValidation.error){
        const errorMessage = joiValidation.error.details.map(detail => detail.message);
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(errorMessage);
    }

    const existEmail = await organizationsRepository.findByEmail(email);

    if(existEmail){
      const errorMessage = "This email address is already in use. Please choose another email address or login";
      return res.status(httpStatus.CONFLICT).send(errorMessage);
    }
    
    return next();
}