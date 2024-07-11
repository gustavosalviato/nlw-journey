import fastify from "fastify";

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import cors from "@fastify/cors";

import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipants } from "./routes/confirm-participants";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { getParticipant } from "./routes/get-participant";
import { getTripDetails } from "./routes/get-trip-details";
import { updateTrip } from "./routes/update-trip";
import { createInvite } from "./routes/create-invite";
import { errorHandler } from "./error-handler";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(getParticipant);
app.register(getTripDetails);
app.register(updateTrip);
app.register(createInvite);

app.register(cors, {
  origin: "*",
});

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("http server running!"));
