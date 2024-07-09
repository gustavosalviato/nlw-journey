import fastify from "fastify";

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { createTrip } from "./routes/create-trip";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("http server running!"));
