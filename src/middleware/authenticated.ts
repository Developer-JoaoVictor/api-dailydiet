import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return reply.status(401).send({ message: 'Missing authorization header' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string
    }

    request.user = { id: decoded.sub }
  } catch (error) {
    return reply.status(401).send({ message: 'Invalid Token' })
  }
}
