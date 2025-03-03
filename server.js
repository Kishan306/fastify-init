import Fastify from "fastify";
import JoiCompiler from 'joi-compiler'
const joiCompilerInstance = JoiCompiler()
const fastify = Fastify({
  logger: false,
  schemaController: {
    bucket: joiCompilerInstance.bucket,
    compilersFactory: {
      buildValidator: joiCompilerInstance.buildValidator
    }
  }
});
import Joi from "joi"
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
  schemaController: {
    bucket: Joi
  }
  fastify.log.error(err);
  process.exit(1);
}
