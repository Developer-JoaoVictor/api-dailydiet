import { FastifyInstance } from 'fastify'
import { authenticateToken } from '../middleware/authenticated'
import { UsersController } from '../controller/users-controller'
import { SessionsController } from '../controller/sessions-controller'
import { MealsController } from '../controller/meals-controller'
import { MetricsControlller } from '../controller/metrics-controller'

const usersController = new UsersController()
const sessionsController = new SessionsController()
const mealsController = new MealsController()
const metricsController = new MetricsControlller()

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', (request, reply) => usersController.create(request, reply))
  app.post('/sessions', (request, reply) =>
    sessionsController.create(request, reply),
  )
  app.post('/meals', { preHandler: authenticateToken }, (request, reply) =>
    mealsController.create(request, reply),
  )
  app.get('/meals/:id', { preHandler: authenticateToken }, (request, reply) =>
    mealsController.show(request, reply),
  )

  app.get(
    '/meals/list',
    { preHandler: authenticateToken },
    (request, reply) => {
      mealsController.index(request, reply)
    },
  )

  app.patch(
    '/meals/:id',
    { preHandler: authenticateToken },
    (request, reply) => {
      mealsController.update(request, reply)
    },
  )

  app.delete(
    '/meals/:id',
    { preHandler: authenticateToken },
    (request, reply) => mealsController.delete(request, reply),
  )

  app.get(
    '/metrics/summary',
    { preHandler: authenticateToken },
    (request, reply) => metricsController.summary(request, reply),
  )
}
