import { Router } from "express";
import { postProject, getProjects, getProject } from '@/controllers'
import { authenticateToken } from "@/middlewares/authMiddleware";
import { validateProjectInput } from "@/middlewares/validateProjectInput";

const projectsRouter = Router();

projectsRouter
    .all("/*", authenticateToken)
    .post('/', validateProjectInput, postProject)
    .get('/', getProjects)
    .get('/:id', getProject);

export { projectsRouter };