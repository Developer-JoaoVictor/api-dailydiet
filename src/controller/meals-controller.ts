import z from 'zod'
import { prisma } from '../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export class MealsController {
  async show(request: FastifyRequest, reply: FastifyReply) {
    const showMealParamsSchema = z.object({
      id: z.uuid(),
    })

    const userId = request.user.id

    const { id } = showMealParamsSchema.parse(request.params)

    try {
      const meal = await prisma.meal.findFirst({
        where: {
          id,
          user_id: userId,
        },
      })

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not foud' })
      }

      return reply.status(200).send({ meal })
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const createMeals = z.object({
      title: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
    })

    const userId = request.user.id

    const { description, isOnDiet, title } = createMeals.parse(request.body)

    const meal = await prisma.meal.create({
      data: {
        title,
        description,
        is_on_diet: isOnDiet,
        user_id: userId,
      },
    })

    return reply.status(201).send({ meal })
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id

    try {
      const meals = await prisma.meal.findMany({
        where: { user_id: userId },
      })

      return reply.status(200).send({ meals })
    } catch (error) {
      return reply.status(401).send({ message: 'Meals not found' })
    }
  }
}
