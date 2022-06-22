import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertChatController } from '../../controllers/upsert-chat';

const Chat = Type.Object({
	admin_id:Type.String(),
	id: Type.String(),
	category: Type.String(),
	message: Type.String(),
	key_Ques:Type.String([]),
});
type Chat = Static<typeof Chat>;


const GetChatQuery = Type.Object({
	category: Type.Optional(Type.String()),
});
type GetChatQuery = Static<typeof GetChatQuery>;

export let chats: Chat[] = [
	{admin_id:'1', id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', category: 'General Life', message: 'hey',key_Ques: 'w' },
	{admin_id:'1', id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', category: 'asq me', message: 'hey' ,key_Ques: 'w' },
	{admin_id:'2', id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', category: 'General Life', message: 'he' ,key_Ques: 'w' },
	{admin_id:'2', id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', category: 'about technology', message: 'h',key_Ques: 'w'  },
	{admin_id:'3', id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', category: 'about technology', message: 'p' ,key_Ques: 'w' },
	{admin_id:'4', id: '3fa85f64-5717-4562-b3fc-2c963f66afa9', category: 'General Life', message: 'q',key_Ques: 'w'  },
];







export default async function(server: FastifyInstance) {
	server.route({
		method: 'PUT',//create means post
		url: '/chats',
		schema: {
			summary: 'Creates new chat + all properties are required',
			tags: ['Chats'],
			body: Chat,
		},
		handler: async (request, reply) => {
			const newChat: any = request.body;
			return upsertChatController(chats, newChat);
		},
	});
	//--------------------------------------

	server.route({
		method: 'PATCH',//update
		url: '/chats/:id',
		schema: {
			summary: 'Update a anser by id + you dont need to pass all properties',
			tags: ['Chats'],
			body: Type.Partial(Chat),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newChat: any = request.body;
			return upsertChatController(chats, newChat);
		},
	});


	//--------------------------------------
	server.route({
		method: 'DELETE',
		url: '/chats/:id',
		schema: {
			summary: 'Deletes a chat',
			tags: ['Chats'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			chats = chats.filter((c) => c.id !== id);

			return chats;
		},
	});
//---------------------------------------------
	server.route({
		method: 'GET',
		url: '/chats/:id',
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

			return chats.find((c) => c.id === id) ?? null;
		},
	});

	//----------------------------------------------------
	server.route({
		method: 'GET',
		url: '/chats',
		schema: {
			summary: 'Gets all chats',
			tags: ['Chats'],
			querystring: GetChatQuery,
			response: {
				'2xx': Type.Array(Chat),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetChatQuery;
			if (query.category) {
				return chats.filter((c) => c.category.includes(query.category ?? ''));//search
			} else {
				return chats;
			}
		},
	});
}