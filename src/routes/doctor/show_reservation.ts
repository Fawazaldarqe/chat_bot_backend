//import { Report } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertPatiantController } from '../../controllers/patiant';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../prisma';
//import reservation from './reservation';
import _ from 'lodash';
import Fuse from 'fuse.js';
import { type } from 'os';
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
    const GetReservations2Query = Type.Object({
        status_reservation: Type.Optional(Type.String()),
    });
    type GetReservations2Query = Static<typeof GetReservations2Query>;

    export default async function (server: FastifyInstance) {
        server.route({
            method: 'GET',
            url: '/show_reservation',
            schema: {
                summary: 'Gets all reservation',
                tags: ['Doctor'],
                querystring: GetReservations2Query,
                response: {
                    '2xx': Type.Array(Reservation),
                },
            },
            handler: async (request, reply) => {
                const query = request.query as GetReservations2Query;
    
                const reservations = await prismaClient.reservation.findMany();
                if (!query.status_reservation) return reservations;
    
                const fuse = new Fuse(reservations, {
                    includeScore: true,
                    isCaseSensitive: false,
                    includeMatches: true,
                    findAllMatches: true,
                    threshold: 1,
                    keys: ['status_reservation'],
                });
    
            	console.log(JSON.stringify(fuse.search(query.status_reservation)));
    
                const result: any[] = fuse.search(query.status_reservation).map((r) => r.item);
                return result;
                // const result= Reservation 
                // const a= fuse.search(query.status_reservation).map((r) => r.item);
                
                // return (a);
            },
        });
    
        
    }