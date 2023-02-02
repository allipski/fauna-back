import { prisma } from "@/config";
import { ProjectType } from "@/controllers";

async function createProject(projectData: ProjectType, organizationId: number) {
    return await prisma.project.create({
        data: {
            name: projectData.name,
            description: projectData.description,
            organizationId: organizationId,
            img: projectData.img
        }
    })
}

async function findProjects(organizationId: number) {
    return await prisma.project.findMany({
        where: {
            organizationId: organizationId
        },
        select :{
            id: true,
            name: true,
            description: true,
            img: true
        }
    })
}

async function findProjectById(projectId: number) {
    return await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })
}

// async function deleteProject(userId: number) {
//     return await prisma.session.delete({
//         where: {
//             organizationId: userId
//         }
//     })
// }

const projectsRepository = {
    createProject,
    findProjects,
    findProjectById
}

export default projectsRepository;