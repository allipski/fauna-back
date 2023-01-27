import { Router } from "express";
import { signUp } from '@/controllers';
import { validateSignupInput } from "@/middlewares";

const organizationsRouter = Router();

organizationsRouter
    .post('/', validateSignupInput, signUp)

export { organizationsRouter };