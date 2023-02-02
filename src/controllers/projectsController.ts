import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import projectsService from "@/services/projectsService";

export type ProjectType = {
  name: string,
  description: string,
  img: string
}

async function postProject(req: AuthenticatedRequest, res: Response) {
  const projectData = req.body as ProjectType;
  const organizationId = req.userId

  try {
    const project = await projectsService.postProject(projectData, organizationId)
    return res.status(httpStatus.CREATED).send(project);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function getProjects(req: AuthenticatedRequest, res: Response) {
    const organizationId : number = req.userId

    try {
      const projects = await projectsService.getProjects(organizationId)
      return res.status(httpStatus.OK).send(projects);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

async function getProject(req: AuthenticatedRequest, res: Response) {
  const projectId  = req.params.id

  try {
    const projects = await projectsService.getProject(Number(projectId))
    return res.status(httpStatus.OK).send(projects);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export { postProject, getProjects, getProject };