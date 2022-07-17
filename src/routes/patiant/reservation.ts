import { Patiant} from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import { upsertPatiantController } from '../../controllers/patiant';
import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { prismaClient } from '../../../prisma';
import { addAuthorization } from '../../hooks/auth';

 const Reservation =Type.Object({
   reservation_id: Type.String(),
    date_day: Type.String({format:"date-time"}),
    date_reservation: Type.String(),
    status_reservation: Type.String(),
    details: Type.String(),
    sriose_case: Type.String(),
    Patiant_id: Type.String(),
});

type Reservation = Static<typeof Reservation>
const Patiant =Type.Object({
    patiant_id: Type.String(),
    first_name: Type.String(),
    second_name: Type.String(),
    email: Type.String(),
    password: Type.String(),
     //reservation_id: Type.String(),

    reservations: Type.Optional(Type.Array(Reservation))
});
const ReservationParams = Type.Object({
	reservation_id: Type.String(),
});
type ReservationParams = Static<typeof ReservationParams>;

const ReservationWithoutId = Type.Object({
	date_day: Type.String({format:"date-time"}),
    date_reservation: Type.String(),
    status_reservation: Type.String(),
    details: Type.String(),
    sriose_case: Type.String(),
    Patiant_id: Type.String(),
});
type ReservationWithoutId = Static<typeof ReservationWithoutId>;

const PartialReservationWithoutId = Type.Partial(ReservationWithoutId);
type PartialReservationWithoutId = Static<typeof PartialReservationWithoutId>;


const GetReservationsQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
type GetReservationsQuery = Static<typeof GetReservationsQuery>;
export default async function (server: FastifyInstance) {
	//addAuthorization(server);

	server.route({
		method: 'PUT',
		url: '/reservation',
		schema: {
			summary: 'Creates new reservation + all properties are required',
			tags: ['Patiant'],
			body: Reservation,
		},
		handler: async (request, reply) => {
			const reservation = request.body as any;
			return await prismaClient.reservation.upsert({
				where: { reservation_id: reservation.reservation_id },
				create: {..._.omit(reservation,['Patiant_id'])as any,
					Patiant:{
						connect:{patiant_id:reservation.Patiant_id}
					},
				},
				update: _.omit(reservation, ['reservation_id']),
			});
		},
	});
}

