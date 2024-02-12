import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import reactionsIcons from '@/helpers/reactions'
import io from 'socket.io-client';
import { faEye } from '@fortawesome/free-solid-svg-icons'

const Bubble = dynamic(import('@/components/Player/Bubble'));

interface ILikes {
    id: any;
    name: string;
}

function Reactions() {
    const [connectors, setConnectors] = useState('0');
    const [likes, setLikes] = useState<ILikes[]>([]);
    const socketRef = useRef<any>();
    const cleanLike = useRef((id: any) => { setLikes((currentLikes) => currentLikes.filter((like) => like.id !== id)) });

    useEffect(() => {
        fetch("/api/socket/io").finally(() => {
            socketRef.current = io();

            socketRef.current.on(`reaction`, (reaction: string) => {
                setLikes((prevLikes) => [...prevLikes, { id: new Date().getTime(), name: reaction }])
            });

            socketRef.current.on(`userCount`, (userCount: string) => {
                setConnectors(userCount)
            });

            return () => {
                socketRef.current.disconnect();
            };
        })
    }, []);

    const sendReaction = (reactionName: string) => {
        if (socketRef.current) {
            socketRef.current.emit("reaction", reactionName);
        } else {
            console.log("Socket is not ready yet, giving a dummy reacting for now!")
            setLikes((prevLikes) => [...prevLikes, { id: new Date().getTime(), name: reactionName }])
        }
    };

    return (
        <>
            <div className='fixed bottom-4 right-3 flex space-x-2'>
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

                <div
                    className={`text-white border border-white w-[60px] h-9 flex rounded-full items-center space-x-2`}
                >
                    <FontAwesomeIcon className='fixed right-[45px] w-[20px]' icon={faEye} />
                    <div className='fixed right-[25px] text-sm'>
                        {connectors} 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reactions