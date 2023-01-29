import { Router } from "express";
import { postProject, getProjects } from '@/controllers'
import { authenticateToken } from "@/middlewares/authMiddleware";
import { validateProjectInput } from "@/middlewares/validateProjectInput";

const projectsRouter = Router();

projectsRouter
    .all("/*", authenticateToken)
    .post('/', validateProjectInput, postProject)
    .get('/', getProjects);

export { projectsRouter };