import { Report} from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertPatiantController } from '../../controllers/patiant';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../prisma';
//import reservation from './reservation';
import _ from 'lodash';
import Fuse from 'fuse.js';
import { type } from 'os';

const Report =Type.Object({
    report_id: Type.String(),
    patiant_name: Type.String(),
    doctor_name: Type.String(),
    subject: Type.String(),
    text: Type.String(),
});
const Report_Without_Id =Type.Object({
    //report_id: Type.String(),
    patiant_name: Type.String(),
    doctor_name: Type.String(),
    subject: Type.String(),
    text: Type.String(),
});
const GetReportsQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
type GetReportsQuery = Static<typeof GetReportsQuery>;

export default async function (server:FastifyInstance) {
    server.route({
		method: 'GET',
		url: '/reports',
		schema: {
			summary: 'Gets all reports',
			tags: ['Manager'],
			querystring: GetReportsQuery,
			response: {
				'2xx': Type.Array(Report),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetReportsQuery;

			const reports = await prismaClient.report.findMany();
			if (!query.text) return reports;

			const fuse = new Fuse(reports, {
				includeScore: true,
				isCaseSensitive: false,
				includeMatches: true,
				findAllMatches: true,
				threshold: 1,
				keys: ['patiant_name', 'doctor_name','subject'],
			});

		//	console.log(JSON.stringify(fuse.search(query.text)));

			const result: Report[] = fuse.search(query.text).map((r) => r.item);
			return result;
		},
	});

}