import { connectDb, prismaClient } from './prisma';
import { listen } from './src/server';
async function start() {
	await connectDb();
	listen();
}
start();

