import { prisma } from "@/config";
import { SpeciesType } from "@/controllers";

async function createSpecies(speciesData: SpeciesType, projectId: number) {
    return await prisma.species.create({
        data: {
            name: speciesData.name,
            location: speciesData.location,
            status: speciesData.status,
            img: speciesData.img,
            projectId: projectId
        }
    })
}

async function findSpeciesWithIndividualCount(projectId?: number) {
    if(projectId){
        return await prisma.species.findMany({
            where: {
                projectId: projectId
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
    } else {
        return await prisma.species.findMany({
            select :{
                id: true,
                name: true,
                location: true,
                status: true,
                img: true
            }
        })
    }
    
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