import http, { IncomingMessage, ServerResponse } from 'http'
import SocketService from './services/socket';
import { startMessageConsumer } from './services/kafka';
import prismaClient from './services/prisma';
import { parse } from 'url';

async function init(){
    startMessageConsumer();
    const socketService = new SocketService();
    const httpServer = http.createServer(requestHandler);
    const PORT = process.env.PORT ? process.env.PORT: 8000;

    socketService.io.attach(httpServer);
    httpServer.listen(PORT,() =>{
        console.log(`HTTP Server started at PORT:${PORT}`)
    });

    socketService.initListeners();
}

function requestHandler(req: IncomingMessage, res: ServerResponse) {
    const { pathname } = parse(req.url || '', true);

    // Enable CORS for all routes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle different routes
    if (pathname === '/messages' && req.method === 'GET') {
        handleGetMessages(req, res);
    } else {
        // Handle other routes or return a 404 response
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

async function handleGetMessages(req: IncomingMessage, res: ServerResponse) {
    try {
        const chatId = req.url?.split('=')[1]; // Extract chatId from query parameters
        const messages = await prismaClient.message.findMany({
            where: {
            chatId: chatId || "Chat 1", // Default to "Chat 1" if chatId is not provided
            },
            orderBy:{
                createdAt: "asc"
            }
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(messages));
        console.log('Message sent');
    } catch (error) {
        console.log('Message not sent');
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

init();