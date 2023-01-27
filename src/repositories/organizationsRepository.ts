import { prisma } from "@/config";
import { signUpData } from "@/controllers";

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

const organizationsRepository = {
    findByEmail,
    createOrganization
}

export default organizationsRepository;