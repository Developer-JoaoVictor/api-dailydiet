import Fastify from 'fastify'
import { appRoutes } from './routes/routes'

export const app = Fastify()

app.register(appRoutes)
