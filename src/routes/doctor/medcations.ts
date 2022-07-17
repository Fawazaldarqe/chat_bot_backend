import { Medcation } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { type } from 'os';
//import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../../prisma';


const Medcation =Type.Object({
    medcation_id: Type.String(),
    madcation_name: Type.String(),
    medicine_recipe: Type.String(),
  });
  const GetMedcationsQuery = Type.Object({
	madcation_name: Type.Optional(Type.String()),
});
type GetMedcationsQuery = Static<typeof GetMedcationsQuery>;

  export default async function (server: FastifyInstance) {
  server.route({
    method: 'GET',
    url: '/medcations',
    schema: {
        summary: 'Gets all medcations',
        tags: ['Doctor'],
        querystring: GetMedcationsQuery,
        response: {
            '2xx': Type.Array(Medcation),
        },
    },
    handler: async (request, reply) => {
        const query = request.query as GetMedcationsQuery;

        const medcations = await prismaClient.medcation.findMany();
        if (!query.madcation_name) return medcations;

        const fuse = new Fuse(medcations, {
            includeScore: true,
            isCaseSensitive: false,
            includeMatches: true,
            findAllMatches: true,
            threshold: 1,
            keys: ['madcation_name'],
        });

        console.log(JSON.stringify(fuse.search(query.madcation_name)));

        const result: Medcation[] = fuse.search(query.madcation_name).map((r) => r.item);
        return result;
    },
});
  }