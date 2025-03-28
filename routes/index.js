import db from "../config/db.js";
import Joi from "joi";
import JoiCompiler from 'joi-compiler'
const joiCompilerInstance = JoiCompiler()

const userSchema = joiCompilerInstance.joi.object({
    name: joiCompilerInstance.joi.string().pattern(new RegExp('^[a-zA-Z]{3,10}$')).message("Only 3-30 uppercase and lowercase letters accepted!!")
  });

async function routes(fastify, options) {
  fastify.get("/", {
    schema: {
        querystring: userSchema
    },
    handler: async (request, reply) => {
      reply.status(200).send({ message: `Hello ${request.query.name}` });
    },
  });

  fastify.get("/customers", {
    preHandler: async (request, reply) => {
      console.log("getting customers data");
    },
    handler: async (request, reply) => {
      const [rows] = await db.query("select * from customers");
      reply.status(200).send({ data: rows });
    },
  });

  fastify.get("/orders", {
    preHandler: async (request, reply) => {
      console.log("getting orders data");
    },
    handler: async (request, reply) => {
      const [rows] = await db.query("select * from orders");
      reply.status(200).send({ data: rows });
    },
  });

  fastify.get("/order-items", {
    preHandler: async (request, reply) => {
      console.log("getting order items data");
    },
    handler: async (request, reply) => {
      const [rows] = await db.query("select * from order_items");
      reply.status(200).send({ data: rows });
    },
  });

  fastify.get("/sales-report", {
    preHandler: async (request, reply) => {
      console.log("getting sales report data");
    },
    handler: async (request, reply) => {
      const [rows] = await db.query("select * from sales_report");
      reply.status(200).send({ data: rows });
    },
  });

  fastify.get("/customer-order-history", {
    preHandler: async (request, reply) => {
      console.log("getting all customers' order history data");
    },
    handler: async (request, reply) => {
      const [rows] = await db.query(
        "select c.customer_id, c.customer_name, c.email, o.order_id, o.order_date, o.total_amount from customers c left join orders o on c.customer_id = o.customer_id;"
      );
      reply.status(200).send({ data: rows });
    },
  });

  fastify.route({
    method: "POST",
    url: "/user",
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
        required: ["username", "password"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            username: { type: "string" },
          },
        },
        401: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    preHandler: async (request, reply) => {
      console.log("Received login attempt from:", request.body.username);
    },
    handler: async (request, reply) => {
      const { username, password } = request.body;

      if (username == "admin" && password == "admin") {
        return {
          message: "login successful",
          username,
        };
      } else if (username != "admin") {
        reply.status(404).send({ message: "user not found" });
      } else {
        reply.status(401).send({ message: "invalid credentials" });
      }
    },
  });
}

export default routes;
