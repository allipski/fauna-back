import { prisma } from "@/config";

async function createSession(userId: number, token: string) {
    const session = await prisma.session.upsert({
        where: {
            organizationId: userId
        },
        create: {
            organizationId: userId,
            token: token
        },
        update: {
            token: token
        }
    })
    const organization = await prisma.organization.findUnique({
        where: {
            id: userId
        }
    })
    return { 
        organization: organization.name,
        token: session.token 
    }
}

async function deleteSession(userId: number) {
    return await prisma.session.delete({
        where: {
            organizationId: userId
        }
    })
}

const sessionsRepository = {
    createSession,
    deleteSession
}

export default sessionsRepository;