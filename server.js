import Fastify from "fastify";
const fastify = Fastify({
  logger: false,
});
import routes from "./routes/index.js";

fastify.setErrorHandler((error, request, reply)=> {
  console.log(error);

  reply.status(500).send({
    message: "Something went wrong!!",
    error: error.message
  })
})

fastify.register(routes);

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
