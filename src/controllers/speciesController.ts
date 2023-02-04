import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import speciesService from "@/services/speciesService";

export type SpeciesType = {
  id: number;
  name: string,
  location: string,
  status: string,
  description: string,
  img: string,
  projectId: number
}

async function postSpecies(req: AuthenticatedRequest, res: Response) {
  const speciesData = req.body as SpeciesType;

  try {
    const species = await speciesService.postSpecies(speciesData, speciesData.projectId)
    return res.status(httpStatus.CREATED).send(species);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function getSpecies(req: AuthenticatedRequest, res: Response) {
    const queries = req.query as {project?: number, status?: string, name?: string, location?:string};
    if(queries.project) queries.project = Number(queries.project);

    try {
      const species = await speciesService.getSpecies(queries);
      return res.status(httpStatus.OK).send(species);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

async function getSingleSpecies(req: AuthenticatedRequest, res: Response) {
  const SpeciesId  = req.params.id

  try {
    const species = await speciesService.getSingleSpecies(Number(SpeciesId))
    return res.status(httpStatus.OK).send(species);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export { postSpecies, getSingleSpecies, getSpecies };