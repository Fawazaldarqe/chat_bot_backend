import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertChatController } from '../../controllers/upsert-chat';

const Chat = Type.Object({
	user_id:Type.String(),
	category: Type.String(),
	Ansers: Type.String(),
    keys_Question:Type.String(),
});
type Chat = Static<typeof Chat>;


const GetChatQuery = Type.Object({
	category: Type.Optional(Type.String()),
});
type GetChatQuery = Static<typeof GetChatQuery>;

export let chats: Chat[] = [
	{user_id:'3fa85f64-5717-4562-b3fc-2c963f66afa6', category: 'General Life', Ansers: 'hey' ,keys_Question:'how'},
	{user_id:'3fa85f64-5717-4562-b3fc-2c963f66afa5', category: 'asq me', Ansers: 'hey',keys_Question:'how' },
	{user_id:'3fa85f64-5717-4562-b3fc-2c963f66afa2', category: 'General Life', Ansers: 'he',keys_Question:'how' },
	{user_id:'3fa85f64-5717-4562-b3fc-2c963f66afa1', category: 'about technology', Ansers: 'h' ,keys_Question:'how'},
	{user_id:'3fa85f64-5717-4562-b3fc-2c963f66afa3', category: 'about technology', Ansers: 'p' ,keys_Question:'how'},
	{user_id:'3fa85f64-5717-4562-b3fc-2c963f66afa9', category: 'General Life', Ansers: 'q' ,keys_Question:'how'},
];

export default async function (server: FastifyInstance) {
	
//---------------------------------------------
	server.route({
		method: 'GET',
		url: '/chat/:id',
		schema: {
			summary: 'Returns one chat or null',
			tags: ['Chats'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([Chat, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return chats.find((c) => c.user_id === id) ?? null;
		},
	});

	//----------------------------------------------------
	
}