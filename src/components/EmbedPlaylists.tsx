import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from '@material-tailwind/react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import type { Dispatch, SetStateAction } from 'react';

function EmbedPlaylists() {
    const [embedType, setEmbedType] = useState<'youtube' | 'spotify' | ''>('');
    const [embedID, setEmbedID] = useState('');
    const [embedHolderID, setEmebedHolderID] = useState('');
    const [showEmbed, setShowEmbed] = useState(false);
    
    const loadIframe = () => {
        if(embedType == 'spotify') {
            const listId = embedHolderID.match(/\/playlist\/([^/?]+)/);

            if(listId) {
                setEmbedID(listId?.[1]);
                setTimeout(() => {
                    setShowEmbed(true);
                    localStorage.setItem('music-player', JSON.stringify({ provider: 'spotify', playlistID: listId?.[1] }));
                }, 9000);
            } else {
                setEmebedHolderID('Invalid Link');
            }
        } else if (embedType == 'youtube') {
            const listId = embedHolderID.match(/(?:youtube\.com\/(?:watch\?.*?&|\S*?list=)|youtu\.be\/)([0-9A-Za-z_-]{10,})/);

            if(listId) {
                setEmbedID(listId?.[1]);
                setShowEmbed(true);
                localStorage.setItem('music-player', JSON.stringify({ provider: 'youtube', playListID: listId?.[1] }));
            } else {
                setEmebedHolderID('Invalid Link');
            }
        }
    };

    const clearIframe = () => {
        setEmebedHolderID('');
        setEmbedID('');
        setEmbedType('');
        setShowEmbed(false);
    };

    useEffect(() => {
        const music_player = localStorage.getItem('music-player');
        const playLastPlaylist = localStorage.getItem('play-last-playlist') == 'false' ? false : true; 

        if(music_player) {
            try {
                const player = JSON.parse(music_player) as { provider: 'spotify' | 'youtube', playListID: string };
                if(player.playListID && player.provider && playLastPlaylist) {
                    setEmebedHolderID(player.playListID);
                    setEmbedID(player.playListID);
                    setEmbedType(player.provider);
                    setShowEmbed(true);   
                }
            } catch (error) {
                console.error("There was an error trying to set the initial music playlist: ", error)
            }
        }
    }, [])

    return (
        <div className={`flex ${embedType === '' ? 'justify-start' : 'justify-between'} items-center space-x-2`}>
            {(embedType === '') && (
                <>
                    <Tooltip className={'border bg-white border-black text-black'} content="Play a youtube playlist" placement="bottom">
                        <div 
                            onClick={() => setEmbedType('youtube')} 
                            className={'bg-[#ff0000dd] hover:bg-[#ff0000b8] w-[49%] h-[35px] rounded cursor-pointer items-center flex justify-center font-semibold space-x-1 text-white'}
                        >
                            <span><FontAwesomeIcon icon={faYoutube} /></span>
                            <span>Youtube</span>
                        </div>
                    </Tooltip>

                    <Tooltip className={'border bg-white border-black text-black'} content="Play a spotify playlist" placement="bottom">
                        <div 
                            onClick={() => setEmbedType('spotify')} 
                            className={'bg-[#1ed75fda] hover:bg-[#1ed75fa2] w-[49%] h-[35px] rounded cursor-pointer items-center flex justify-center font-semibold space-x-1 text-white'}
                        >
                            <span><FontAwesomeIcon icon={faSpotify} /></span>
                            <span>Spotify</span>
                        </div>
                    </Tooltip>
                </>
            )} 

            {(embedID === '' && embedType !== '') && (
                <>
                    <div className=''>
                        <input
                            type={"text"}
                            className={`rounded px-1 py-[9px] w-[149px] ${(embedHolderID === 'Invalid Link') && 'text-red-600'} ${(embedType === 'youtube') ? 'ring-2 ring-[#FF0000]' : (embedType === 'spotify') && 'ring-2 ring-[#1ED760]'}`}
                            placeholder={`${(embedType === 'youtube') ? 'https://www.youtube.com/playlist?list=somelistid' : (embedType === 'spotify') && 'https://open.spotify.com/playlist/someplaylisid'}`}
                            value={embedHolderID}
                            onChange={(e) => setEmebedHolderID(e.target.value)}
                        />
                    </div>

                    <button onClick={loadIframe} className='bg-[#1ED760] hover:bg-[#1ed75fcf] w-full h-[42px] rounded flex justify-center items-center'><FontAwesomeIcon className='' icon={faCheck} /></button>
                    <button onClick={clearIframe} className='bg-[#FF0000] hover:bg-[#ff0000e0] w-full h-[42px] rounded flex justify-center items-center'><FontAwesomeIcon className='' icon={faXmark} /></button>
                </>
            )}

            {embedID !== '' && embedType === 'spotify' && (
                <div className='rounded-lg bg-[rgb(40,40,40)] border-2 border-white'>
                    <div className={`${!showEmbed && 'hidden'} flex justify-end items-center`}>
                        <button 
                            onClick={clearIframe} 
                            className='w-[25px] h-[25px] rounded flex justify-center items-center text-white'
                        >
                            <FontAwesomeIcon className='' icon={faXmark} />
                        </button>
                    </div>
                    <div className={`${showEmbed && 'hidden'} flex justify-center items-center text-center text-white`}>
                        <div className='p-3'>
                            <div className='flex justify-center items-center my-2'>
                                <div className={"dot-loader-white"}></div>
                            </div>
                            Spotify will play the playlist in preview mode by default if you are not logged in to <a target='_blank' className='text-[#1ED760]' href='https://spotify.com'>spotify.com</a>
                        </div>
                    </div>
                    <iframe 
                        className={`${!showEmbed && 'hidden'}`}
                        src={`https://open.spotify.com/embed/playlist/${embedID}?theme=0`} 
                        width={"100%"} 
                        height={"352"}
                        allowFullScreen
                        allow={"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"}
                        loading={"lazy"}
                    ></iframe>
                </div>
            )}

            {embedID !== '' && embedType === 'youtube' && (
                <div className='rounded-lg bg-black border-2 border-white'>
                    <div className={`${!showEmbed && 'hidden'} flex justify-end items-center`}>
                        <button 
                            onClick={clearIframe} 
                            className='w-[25px] h-[25px] rounded flex justify-center items-center text-white'
                        >
                            <FontAwesomeIcon className='' icon={faXmark} />
                        </button>
                    </div>
                    <div className={`${showEmbed && 'hidden'} flex justify-center items-center text-center text-white`}>
                        <div className='p-3'>
                            <div className='flex justify-center items-center my-2'>
                                <div className={"dot-loader-white"}></div>
                            </div>
                            Ads are played from <a target='_blank' className='text-red-700' href='https://youtube.com'>youtube.com</a>, not from this site {';)'}
                        </div>
                    </div>
                    <iframe 
                        className={`${!showEmbed && 'hidden'}`}
                        width="100%" 
                        height="352" 
                        src={`https://www.youtube.com/embed?listType=playlist&list=${embedID}`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                    ></iframe>
                </div>
            )}

        </div>
    )
}

export default EmbedPlaylists;