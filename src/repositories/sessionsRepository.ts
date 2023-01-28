import { prisma } from "@/config";

async function createSession(userId: number, token: string) {
    return await prisma.session.create({
        data: {
            organizationId: userId,
            token: token
        }
    })
}

const sessionsRepository = {
    createSession
}

export default sessionsRepository;