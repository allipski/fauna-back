import { Router } from "express";
import { signUp, updateData } from '@/controllers';
import { authenticateToken, validateSignupInput } from "@/middlewares";

const organizationsRouter = Router();

organizationsRouter
    .post('/', validateSignupInput, signUp)
    .put('/', authenticateToken, updateData)

export { organizationsRouter };