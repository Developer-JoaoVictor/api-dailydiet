import { prisma } from '../lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

export class MetricsControlller {
  async summary(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id
    const whereUser = { user_id: userId }

    const [totalMeals, totalMealsOnDiet, totalMealsOffDiet] = await Promise.all(
      [
        prisma.meal.count({ where: whereUser }),
        prisma.meal.count({ where: { ...whereUser, is_on_diet: true } }),
        prisma.meal.count({ where: { ...whereUser, is_on_diet: false } }),
      ],
    )

    const meals = await prisma.meal.findMany({
      where: whereUser,
      orderBy: { created_at: 'asc' },
    })

    let bestSequence = 0
    let currentSequence = 0

    for (let i = 0; i < meals.length; i++) {
      const meal = meals[i]

      if (meal.is_on_diet) {
        currentSequence++
      } else {
        if (currentSequence > bestSequence) {
          bestSequence = currentSequence
        }

        currentSequence = 0
      }
    }

    if (currentSequence > bestSequence) {
      bestSequence = currentSequence
    }

    return reply
      .status(200)
      .send({ totalMeals, totalMealsOnDiet, totalMealsOffDiet, bestSequence })
  }
}
