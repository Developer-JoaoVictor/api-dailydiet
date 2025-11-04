import { FastifyInstance } from 'fastify'
import { UsersController } from '../controller/users-controller'

const usersController = new UsersController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', (request, reply) => usersController.create(request, reply))
}
