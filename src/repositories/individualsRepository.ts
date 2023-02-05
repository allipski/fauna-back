import { prisma } from "@/config";
import { IndividualType } from "@/controllers";
import { IndividualsFilter } from "@/types/types";

async function createIndividual(individualData: IndividualType, speciesId: number) {
    return await prisma.individual.create({
        data: {
            name: individualData.name,  
            geocode: individualData.geocode,
            age: Number(individualData.age),
            gender: individualData.gender,
            onRehab: individualData.onRehab,
            natureReady: individualData.natureReady,
            img: individualData.img,
            speciesId: Number(speciesId)
        }
    })
}

async function findIndividuals(queries : IndividualsFilter) {    
    const individuals = await prisma.individual.findMany({
        where: {
            speciesId: queries.species || undefined,
            gender: queries.gender,
            onRehab: queries.rehab,
            releaseDate: queries.released === false ? null : undefined,
            healthStatus: queries.health,
            species: {
                name: queries.speciesName,
                location: queries.location
            }
        },
        include: {
            species: true
        }
    })
    return queries.released === false || queries.released === undefined ? individuals : individuals.filter(item => item.releaseDate !== null)
}

async function findIndividualById(individualId: number) {
    return await prisma.individual.findUnique({
        where: {
            id: individualId
        }
    })
}

// async function deleteindividual(userId: number) {
//     return await prisma.session.delete({
//         where: {
//             organizationId: userId
//         }
//     })
// }

const individualsRepository = {
    createIndividual,
    findIndividuals,
    findIndividualById
}

export default individualsRepository;