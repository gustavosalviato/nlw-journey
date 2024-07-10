import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { prisma } from "../lib/prisma";

import { z } from "zod";

export async function confirmParticipants(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/participants/:participantId/confirm",
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params;

      const participant = await prisma.participant.findUnique({
        where: {
          id: participantId,
        },
      });

      if (!participant) {
        throw new Error("Participant not found");
      }

      if (participant.is_confirmed) {
        return reply.redirect(`http://localhost:3000/trips/${participant.id}`);
      }

      await prisma.participant.update({
        where: {
          id: participant.id,
        },
        data: {
          is_confirmed: true,
        },
      });

      return reply.redirect(`http://localhost:3000/trips/${participant.id}`);
    }
  );
}