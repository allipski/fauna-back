import { notFoundError, unauthorizedError } from "@/errors";
import speciesRepository from "@/repositories/speciesRepository";
import { SpeciesType } from "@/controllers";

async function postSpecies(SpeciesData: SpeciesType, projectId: number) {
    try {
        const species = await speciesRepository.createSpecies(SpeciesData, projectId);
        return species; 
    } catch (err) {
        throw unauthorizedError();
    }
}

async function getSpecies(queries: {project?: number, status?: string, name?: string, location?:string}) {
    try {
        const species = await speciesRepository.findSpeciesWithIndividualCount(queries);
        return species; 
    } catch (err) {
        throw notFoundError();
    }
}

async function getSingleSpecies(speciesId: number) {
    try {
        const Species = await speciesRepository.findSpeciesById(speciesId);
        return Species; 
    } catch (err) {
        throw notFoundError();
    }
}

const speciesService = {
    postSpecies,
    getSingleSpecies,
    getSpecies
}

export default speciesService