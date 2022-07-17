import { Doctor} from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertDoctorController } from '../../controllers/doctor';
//import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../prisma';

const Reservation =Type.Object({
    reservation_id: Type.String(),
    date_day: Type.String(),
    date_reservation: Type.String(),
    status_reservation: Type.Boolean(),
    detils: Type.String(),
    sriose_case: Type.String(),

});
const Doctor =Type.Object({
    // Doctor_id: Type.String(),
    first_name: Type.String(),
    second_name: Type.String(),
    speciatly: Type.String(),
    email: Type.String(),
    password: Type.String(),
    reservations:Type.Optional(Type.Array(Reservation)),

});

type Doctors =Static<typeof Doctor>;
const GetDoctorsQuery =Type.Object({
    second_name: Type.Optional(Type.String()),

});
type GetDoctorsQuery = Static<typeof GetDoctorsQuery>;
export default async function (server: FastifyInstance) {

// server.route({
//     method: 'PUT',
//     url: '/register',
//     schema: {
//         summary: 'Creates new account for Doctor',
//         tags: ['Doctor'],
//         body: Doctor,
//     },
//     handler: async (request, reply) => {
//         const doctor = request.body as any;
//         await prismaClient.doctor.create({
//             data: {...doctor,
//                 reservations:{ connect:[doctor.reservations]},
//             },
//         });

//         return prismaClient.doctor.findMany();
//     },   
// });

}