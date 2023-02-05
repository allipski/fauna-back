import { prisma } from "@/config";
import { signUpData, UpdateData } from "@/controllers";

async function findByEmail(email : string) {
    return await prisma.organization.findUnique({
        where: {
            email: email
        },
      })
}

async function createOrganization(signUpData : signUpData) {
    return await prisma.organization.create({
        data: {
            name: signUpData.name,
            email: signUpData.email,
            password: signUpData.password
        }
    })
}

async function updateOrganization(data : UpdateData, userId: number) {
    return await prisma.organization.update({
        where: {
            id: userId
        },
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })
}

const organizationsRepository = {
    findByEmail,
    createOrganization,
    updateOrganization
}

export default organizationsRepository;