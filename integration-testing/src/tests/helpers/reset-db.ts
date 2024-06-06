import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function clearDB () {
    prisma.request.deleteMany()
}