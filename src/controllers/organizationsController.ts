import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import organizationsService from "@/services/organizationsService"
import bcrypt from "bcrypt";
import httpStatus from "http-status";

async function signUp(req: AuthenticatedRequest, res: Response) {
    const { name, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 12);
    const signUpData : signUpData =  { name: name, email: email, password: passwordHash };

  try {
    await organizationsService.signUp(signUpData)
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export type signUpData = {
    name: string,
    email: string,
    password: string
}

export { signUp };