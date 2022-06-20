const fastify = require('fastify')({ logger: true })
// should be useing export but I will do it soon
fastify.get('/:id', function (request, reply) {
    reply.send({ wlcome_message: request.parms.id })
  })
  fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    // Server is now listening on ${address}
  })