import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IUserCountSideBar {
    socketID: string;
    vid: string;
    connectors: string | number;
}

function ioHandler(_req: NextApiRequest, res: NextApiResponse) {
    if (!(res.socket as any).server.io) {
        const io = new Server((res.socket as any).server);

        let globalConnectors: IUserCountSideBar[] = [];

        io.on('connection', async socket => {
            const { videoID } = socket.handshake.query;

            if(videoID) {
                socket.join(videoID as string);
                const sockets = await io.in(videoID as string).fetchSockets();

                globalConnectors.push({
                    socketID: socket.id,
                    vid: videoID as string,
                    connectors: sockets.length
                });
                
                io.emit(`usersCount`, globalConnectors);

                io.in(videoID as string).emit(`userCount-${videoID}`, sockets.length);
                console.log(`user-${videoID} connected: `, sockets.length);

                socket.on(`reaction-${videoID}`, (msg) => {
                    console.log(`reaction-${videoID}: ` + msg);
                    io.in(videoID as string).emit(`reaction-${videoID}`, msg);
                });

                socket.on('disconnect', async () => {
                    const newConnectors = globalConnectors.filter((connector) => (connector.socketID !== socket.id));
                    globalConnectors = newConnectors;
                    
                    io.emit(`usersCount`, newConnectors);

                    const currentSockets = await io.in(videoID as string).fetchSockets();
    
                    io.in(videoID as string).emit(`userCount-${videoID}`, currentSockets.length);
                    socket.leave(videoID as string);
                    
                    console.log(`user-${videoID} disconnected: `, sockets.length);
                });
            } else {
                console.log('Video Id Doesnt exist ')
            }
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