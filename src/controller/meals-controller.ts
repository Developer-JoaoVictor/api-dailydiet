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
      const meal = await prisma.meal.findUnique({
        where: {
          id,
          user_id: userId,
        },
      })

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not found' })
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
      return reply.status(500).send({ message: 'Meals not found' })
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.uuid(),
    })

    const bodySchema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      isOnDiet: z.boolean().optional(),
    })

    const userId = request.user.id
    const { id } = paramsSchema.parse(request.params)
    const { title, description, isOnDiet } = bodySchema.parse(request.body)

    try {
      const meal = await prisma.meal.findFirst({
        where: { id, user_id: userId },
      })

      if (!meal) {
        return reply.status(404).send({ message: 'Meal nout found' })
      }

      const updateMeal = await prisma.meal.update({
        where: { id },
        data: {
          title,
          description,
          is_on_diet: isOnDiet,
        },
      })

      return reply.status(200).send({ meal: updateMeal })
    } catch (error) {
      return reply.status(500).send({ message: 'Internal Sever Error' })
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string(),
    })

    const userId = request.user.id

    const { id } = paramsSchema.parse(request.params)

    try {
      const meal = await prisma.meal.findFirst({
        where: { id, user_id: userId },
      })

      if (!meal) {
        return reply.status(404).send({ message: 'Meal not found' })
      }

      await prisma.meal.delete({
        where: { id },
      })

      return reply.status(204).send()
    } catch (error) {
      return reply.status(500).send({ message: 'Internal Sever Error' })
    }
  }
}
