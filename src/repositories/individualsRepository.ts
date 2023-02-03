import { prisma } from "@/config";
import { IndividualType } from "@/controllers";

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

async function findIndividuals(queries : {species?: number, rehab?: boolean, released?: boolean}) {    
    const individuals = await prisma.individual.findMany({
        where: {
            speciesId: queries.species || undefined,
            onRehab: queries.rehab === true ? true : queries.rehab === undefined ? undefined : false,
            releaseDate: queries.released === false ? null : undefined
        },
        select :{
            id: true,
            name: true,
            geocode: true,
            age: true,
            gender: true,
            onRehab: true,
            natureReady: true,
            releaseDate: true,
            img: true,
            speciesId: true
        },
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