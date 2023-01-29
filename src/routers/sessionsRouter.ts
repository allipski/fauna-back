import { signIn, signOut } from "@/controllers";
import { validateSignInInput } from "@/middlewares";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter
    .post('/', validateSignInInput, signIn)
    .delete('/', authenticateToken, signOut)

export { sessionsRouter };