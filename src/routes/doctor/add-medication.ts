import { Medcation } from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import Fuse from 'fuse.js';
import _ from 'lodash';
import { type } from 'os';
//import { addAuthorization } from '../../hooks/auth';
import { prismaClient } from '../../../prisma';
import { addAuthorization } from '../../hooks/auth';




  const Medcation =Type.Object({
    medcation_id: Type.String(),
    madcation_name: Type.String(),
    medicine_recipe: Type.String(),
  });
  const MedcationWithoutId =Type.Object({
    madcation_name: Type.String(),
    medicine_recipe: Type.String(),
  });
  type MedcationWithoutId =Static<typeof MedcationWithoutId>;
  export default async function (server: FastifyInstance) {
	//addAuthorization(server);

    server.route({
		method: 'POST',
		url: '/add_medcation',
		schema: {
			summary: 'Add medcation',
			tags: ['Doctor'],
			body: MedcationWithoutId,
		},
		handler: async (request, reply) => {
			const medcation = request.body as MedcationWithoutId;
			return await prismaClient.medcation.create({
				data: medcation,
			});
		},
	});

  }