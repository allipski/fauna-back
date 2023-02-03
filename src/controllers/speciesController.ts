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
    const projectId = Number(req.query.project);

    try {
      let species;
      if (projectId) {
        species = await speciesService.getSpecies(projectId);
      } else {
        species = await speciesService.getSpecies();
      }
      return res.status(httpStatus.OK).send(species);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

async function getSingleSpecies(req: AuthenticatedRequest, res: Response) {
  const SpeciesId  = req.params.id

  try {
    const Speciess = await speciesService.getSpecies(Number(SpeciesId))
    return res.status(httpStatus.OK).send(Speciess);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export { postSpecies, getSingleSpecies, getSpecies };