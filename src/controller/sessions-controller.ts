import z from 'zod'
import { compare } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export class SessionsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const loginSchema = z.object({
      email: z.email(),
      password: z.string().min(6),
    })

    const { email, password } = loginSchema.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }

    const isPasswordValid = await compare(password, user.password_hash)

    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({}, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: '7d',
    })

    return reply.status(200).send({ token })
  }
}
