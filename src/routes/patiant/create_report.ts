//import { Report} from '@prisma/client';
import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertPatiantController } from '../../controllers/patiant';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../prisma';
import reservation from './reservation';
import _ from 'lodash';
import { type } from 'os';
import { addAuthorization } from '../../hooks/auth';

const Report =Type.Object({
    report_id: Type.String(),
    patiant_name: Type.String(),
    doctor_name: Type.String(),
    subject: Type.String(),
    text: Type.String(),
});
const ReportWithoutId =Type.Object({
    patiant_name: Type.String(),
    doctor_name: Type.String(),
    subject: Type.String(),
    text: Type.String(),
});
type ReportWithoutId = Static<typeof ReportWithoutId>
type Report =Static<typeof Report>;
const GetReportsQuery =Type.Object({
    doctor_name: Type.Optional(Type.String()),

});
export default async function (server: FastifyInstance) {
	//addAuthorization(server);

	server.route({
		method: 'POST',
		url: '/report',
		schema: {
			summary: 'Creates report',
			tags: ['Patiant'],
			body: ReportWithoutId,
		},
		handler: async (request, reply) => {
			const report = request.body as ReportWithoutId;
			return await prismaClient.report.create({
				data: report,
			});
		},
	});

}
