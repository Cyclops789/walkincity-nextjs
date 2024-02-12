import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

function ioHandler(_req: NextApiRequest, res: NextApiResponse) {
    if (!(res.socket as any).server.io) {
        console.log('First use, starting socket.io');

        const io = new Server((res.socket as any).server);

        io.on('connection', socket => {
            io.emit('userCount', io.engine.clientsCount);
            console.log(`${socket.id} connected: `+io.engine.clientsCount);

            socket.on('reaction', (msg) => {
                console.log('reaction: ' + msg);
                io.emit('reaction', msg);
            });

            socket.on('disconnect', () => {
                io.emit('userCount', io.engine.clientsCount);
                console.log('user disconnected: '+io.engine.clientsCount);
            });
        });

        (res.socket as any).server.io = io;
    } else {
        console.log('socket.io already running');
    }
    res.end();
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler;