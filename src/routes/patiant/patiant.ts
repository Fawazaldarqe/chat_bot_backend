import { Patiant} from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { ObjectId } from 'bson';
import { upsertPatiantController } from '../../controllers/patiant';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import reservation from './reservation';
import _ from 'lodash';

const y = require('fastify')()
y.register(require('@fastify/jwt'), {
  secret: 'supersecret'
})
const Reservation =Type.Object({
    reservation_id: Type.String(),
    date_day: Type.String(),
    date_reservation: Type.String(),
    status_reservation: Type.Boolean(),
    detils: Type.String(),
    sriose_case: Type.String()
});
type Reservation =Static<typeof Reservation>;

const Patiant =Type.Object({
    patiant_id: Type.String(),
    first_name: Type.String(),
    second_name: Type.String(),
	email: Type.String({ format: 'email' }),
    password: Type.String(),
   // reservations: Type.Optional(Type.Array(Reservation))
});
const PatiantWithouId =Type.Object({
    //patiant_id: Type.String(),
    first_name: Type.String(),
    second_name: Type.String(),
	email: Type.String({ format: 'email' }),
    password: Type.String(),
   // reservations: Type.Optional(Type.Array(Reservation))
});
type Patiants =Static<typeof Patiant>;
type PatiantWithouId =Static<typeof PatiantWithouId>;

const GetPatiantsQuery =Type.Object({
    second_name: Type.Optional(Type.String()),

});

type GetPatiantsQuery = Static<typeof GetPatiantsQuery>;
const CreateBody = Type.Object({
    patiant: Patiant,
    reservations: Type.Optional(Type.Array(Reservation))
})
const CreateBody3 = Type.Object({
    patiant: PatiantWithouId,
    reservations: Type.Optional(Type.Array(Reservation))
})
const CreateBody2 = Type.Object({
    reservations: Reservation,
    //reservations: Type.Optional(Type.Array(Reservation))
})
type CreateBody =Static<typeof CreateBody>;
    type CreateBody2 =Static<typeof CreateBody2>;

export default async function (server: FastifyInstance) {
// server.route({
//     method: 'POST',
//     url: '/login',
//     schema: {
//         summary: 'Creates new account',
//         tags: ['Patiant'],
//         body: PatiantWithouId,
//     },
//     handler: async (request, reply) => {

//         const {email,password} = request.body as PatiantWithouId;
//        const patiant = await prismaClient.patiant.findFirst({
//         where: {
//             email: email,
//         },
//     });
//     if (!patiant) {
//         const result = await prismaClient.patiant.create({
//             data: {
//                 email: email,
//                 password: password,
//                 first_name: 'first_name',
//                 second_name: 'second_name',
//             },
// });
// const token = server.jwt.sign({
//     id: result.patiant_id,
//     email: result.email,
//     first_name: result.first_name,
//     second_name: result.second_name,
//     role: 'admin',
// });
// return {
//     id : result.patiant_id,
//     token,
//     type: 'SignUp',
// };
// } else {
//     if (patiant.password !== password) {
//         reply.unauthorized();
//         return;
//     }

//     const token = server.jwt.sign({
//         id: patiant.patiant_id,
//         email: patiant.email,
//         first_name: patiant.first_name,
//         second_name: patiant. second_name,
//         role: 'admin',
//     });

//     return {
//         id: patiant.patiant_id,
//         token,
//         type: 'SignIn',
//     };
// }
// },
// });
}