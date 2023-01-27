import { Router } from "express";
import { postProject, getProjects } from '@/controllers'
import { authenticateToken } from "@/middlewares/authMiddleware";

const projectsRouter = Router();

projectsRouter
    .all("/*", authenticateToken)
    .post('/', postProject)
    .get('/', getProjects);

export { projectsRouter };