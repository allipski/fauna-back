import { prisma } from "@/config";
import { SpeciesType } from "@/controllers";

async function createSpecies(speciesData: SpeciesType, projectId: number) {
    return await prisma.species.create({
        data: {
            name: speciesData.name,
            location: speciesData.location,
            status: speciesData.status,
            description: speciesData.description,
            img: speciesData.img,
            projectId: projectId
        }
    })
}

async function findSpeciesWithIndividualCount(queries: {project?: number, status?: string, name?: string, location?:string}) {
        return await prisma.species.findMany({
            where: {
                projectId: queries.project,
                status: queries.status,
                name: queries.name,
                location: queries.location
            },
            select :{
                id: true,
                name: true,
                location: true,
                status: true,
                img: true,
                _count: {
                    select: {
                        individuals: true
                    }
                }
            },
        })    
}

async function findSpeciesById(speciesId: number) {
    return await prisma.species.findUnique({
        where: {
            id: speciesId
        }
    })
}

// async function deleteSpecies(userId: number) {
//     return await prisma.session.delete({
//         where: {
//             organizationId: userId
//         }
//     })
// }

const SpeciesRepository = {
    createSpecies,
    findSpeciesWithIndividualCount,
    findSpeciesById
}

export default SpeciesRepository;