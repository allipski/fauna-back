import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import individualsService from "@/services/individualsService";
import { number } from "joi";

export type IndividualType = {
  name: string,
  geocode: string,
  age: number,
  gender: string,
  onRehab: boolean,
  natureReady: boolean,
  img: string,
  speciesId: number
}

async function postIndividual(req: AuthenticatedRequest, res: Response) {
  const individualData = req.body as IndividualType;
  try {
    const individual = await individualsService.postIndividual(individualData, individualData.speciesId)
    return res.status(httpStatus.CREATED).send(individual);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function getIndividuals(req: AuthenticatedRequest, res: Response) {
    const { species, rehab, released } = req.query

    type Queries = {
      species: number,
      rehab: boolean,
      released: boolean
    }

    const queries = {
      species: Number(species),
      rehab: rehab === 'true' ? true : rehab === 'false' ? false : undefined,
      released: released === 'true' ? true : released === 'false' ? false : undefined,
    }

    try {
      const individuals = await individualsService.getIndividuals(queries);
      return res.status(httpStatus.OK).send(individuals);
    } catch (error) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

async function getSingleIndividual(req: AuthenticatedRequest, res: Response) {
  const individualId  = req.params.id

  try {
    const individuals = await individualsService.getSingleIndividual(Number(individualId))
    return res.status(httpStatus.OK).send(individuals);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export { postIndividual, getSingleIndividual, getIndividuals };