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

async function updateData(req: AuthenticatedRequest, res: Response) {
  const rawData = req.body;
  const userId = req.userId

      const data = {
        name: rawData.name === '' ? undefined : rawData.name,
        email: rawData.email === '' ? undefined : rawData.email,
        password: rawData.password === '' ? undefined : rawData.password,
        confirmPassword: rawData.confirmPassword === '' ? undefined : rawData.confirmPassword,
      }

      if(data.password !== data.confirmPassword) return res.status(httpStatus.UNPROCESSABLE_ENTITY).send("Passwords do not match.");

  const passwordHash = data.password? bcrypt.hashSync(data.password, 12) : undefined;
  const updateData : UpdateData =  { name: data.name, email: data.email, password: passwordHash };

try {
  const updatedData = await organizationsService.updateOrganization(updateData, userId)
  return res.status(httpStatus.OK).send(updatedData);
} catch (error) {
  return res.sendStatus(httpStatus.NOT_FOUND);
}
}

export type signUpData = {
    name: string,
    email: string,
    password: string
}

export type UpdateData = {
  name?: string,
  email?: string,
  password?: string
  confirmPassword?: string
}


export { signUp, updateData };