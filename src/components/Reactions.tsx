import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IVideosRes } from './SideBar';
import dynamic from 'next/dynamic';
import reactionsIcons from '@/helpers/reactions';
import io from 'socket.io-client';

const Bubble = dynamic(import('@/components/Player/Bubble'));

interface ILikes {
    id: any;
    name: string;
}

function Reactions({ video, setConnectors, connectors }: { video: IVideosRes | undefined, setConnectors: React.Dispatch<React.SetStateAction<string>>, connectors: string }) {
    const [likes, setLikes] = useState<ILikes[]>([]);
    const socketRef = useRef<any>();
    const cleanLike = useRef((id: any) => { setLikes((currentLikes) => currentLikes.filter((like) => like.id !== id)) });

    useEffect(() => {
        if(video) {
            if(socketRef.current) {
                socketRef.current.disconnect();
            }
            
            fetch("/api/socket/io").finally(() => {
                socketRef.current = io({
                    query: {
                        videoID: video.vid
                    }
                });
    
                socketRef.current.on(`reaction-${video.vid}`, (reaction: string) => {
                    setLikes((prevLikes) => [...prevLikes, { id: new Date().getTime(), name: reaction }])
                });
    
                socketRef.current.on(`userCount-${video.vid}`, (userCount: string) => {
                    setConnectors(userCount)
                });
    
                return () => {
                    socketRef.current.disconnect();
                };
            })
        }
    }, [video]);

    const sendReaction = (reactionName: string) => {
        if (socketRef.current && video) {
            socketRef.current.emit(`reaction-${video.vid}`, reactionName);
        } else {
            console.log("Socket is not ready yet, giving a dummy reacting for now!")
            setLikes((prevLikes) => [...prevLikes, { id: new Date().getTime(), name: reactionName }])
        }
    };

    return (
        <>
            <div className='fixed bottom-4 right-3 flex space-x-2 z-[10]'>
                {reactionsIcons.map((reaction) => (
                    <div
                        key={reaction.name}
                        onClick={() => sendReaction(reaction.name)}
                        className={`cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center`}
                    >
                        {likes.map((like) => {
                            if (like.name === reaction.name) {
                                return <Bubble color={reaction.color} onAnimationEnd={cleanLike.current} key={like.id} id={like.id} icon={reaction.icon} />;
                            }
                        })}
                        <FontAwesomeIcon className='w-[20px]' icon={reaction.icon} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Reactions