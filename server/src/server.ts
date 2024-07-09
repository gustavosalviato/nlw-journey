import fastify from "fastify";

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import cors from "@fastify/cors";

import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);

app.register(cors, {
  origin: "*",
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("http server running!"));
