import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import sessionsService from "@/services/sessionsService"
import httpStatus from "http-status";

async function signIn(req: AuthenticatedRequest, res: Response) {
    const { email, password } = req.body;
    const signInData : signInData =  { email: email, password: password};

  try {
    const session = await sessionsService.signIn(signInData)
    return res.status(httpStatus.OK).send(session);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function signOut(req: AuthenticatedRequest, res: Response) {
  const organizationId = req.userId;
  try {
    await sessionsService.signOut(organizationId)
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export type signInData = {
    email: string,
    password: string
}

export { signIn, signOut };