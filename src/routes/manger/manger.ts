import { Manger} from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertMangerController } from '../../controllers/manager';
//import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../prisma';


const Manger =Type.Object({
    Manger_id: Type.String(),
    first_name: Type.String(),
    second_name: Type.String(),
    email: Type.String(),
    password: Type.String()
});
type Mangers =Static<typeof Manger>;
const GetMangersQuery =Type.Object({
    second_name: Type.Optional(Type.String()),

});
type GetMangersQuery = Static<typeof GetMangersQuery>;
export default async function (server: FastifyInstance) {

// server.route({
//     method: 'PUT',
//     url: '/register',
//     schema: {
//         summary: 'Creates new account for Manger',
//         tags: ['Manger'],
//         body: Manger,
//     },
//     handler: async (request, reply) => {
//         const manger = request.body as Manger;
//         await prismaClient.manger.create({
//             data: manger,
//         });

//         return prismaClient.manger.findMany();
//     },   
// });

}