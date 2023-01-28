import { signIn } from "@/controllers";
import { validateSignInInput } from "@/middlewares/validateSignInInput";
import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter
    .post('/', validateSignInInput, signIn)

export { sessionsRouter };