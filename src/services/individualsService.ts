import { notFoundError, unauthorizedError } from "@/errors";
import individualsRepository from "@/repositories/individualsRepository";
import { IndividualType } from "@/controllers";
import { IndividualsFilter } from "@/types/types";

async function postIndividual(individualsData: IndividualType, speciesId: number) {
    try {
        const individuals = await individualsRepository.createIndividual(individualsData, speciesId);
        return individuals; 
    } catch (err) {
        throw unauthorizedError();
    }
}

async function getIndividuals(queries : IndividualsFilter) {
    try {
        const individuals = await individualsRepository.findIndividuals(queries);
        return individuals; 
    } catch (err) {
        throw notFoundError();
    }
}

async function getSingleIndividual(individualsId: number) {
    try {
        const individuals = await individualsRepository.findIndividualById(individualsId);
        return individuals; 
    } catch (err) {
        throw notFoundError();
    }
}

const individualsService = {
    postIndividual,
    getSingleIndividual,
    getIndividuals
}

export default individualsService