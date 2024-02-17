
import React, { useEffect, useState } from 'react'
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Dispatch, SetStateAction } from 'react';
import { IVideosRes, ICountryRes } from '@/components/SideBar';

export interface IVideoComponent {
    v: number | undefined;
    c: number | undefined;
    volume: string;
    countries: ICountryRes[];
    setPlaying: Dispatch<SetStateAction<boolean>>;
    playing: boolean;
    setTitle: Dispatch<SetStateAction<string>>;
    setCurrentCountry: Dispatch<SetStateAction<ICountryRes | undefined>>;
    currentCountry: ICountryRes | undefined;
    setCurrentVideo: Dispatch<SetStateAction<IVideosRes | undefined>>;
    currentVideo: IVideosRes | undefined;
    ended: boolean;
    setEnded: Dispatch<SetStateAction<boolean>>;
}

function video({ v, setPlaying, playing, setTitle, currentVideo, setCurrentVideo, setCurrentCountry, currentCountry, countries, c, volume }: IVideoComponent) {
    const [player, setPlayer] = useState<YouTubePlayer>();
    const [originURL, setOriginURL] = useState('');

    const onReady: YouTubeProps['onReady'] = (e) => {
        e.target.mute();
        e.target.seekTo(60);
        e.target.playVideo();

        setPlayer(e.target)
    }

    const onStateChange: YouTubeProps['onStateChange'] = (e) => {
        switch(e.target.getPlayerState()) {
            case -1: // unstarted
                setPlaying(false);
                break;
            case  0: // ended
                setPlaying(false);
                break;
            case  1: // playing - enable in production
                setPlaying(false);
                break;
            case  2: // paused
                setPlaying(false);
                e.target.seekTo(60);
                e.target.playVideo();
                break;
            case  3: // buffering
                setPlaying(false);
                break;
            case  5: // video cued
                setPlaying(false);
                break;
        }
    }

    useEffect(() => {
        const foundCountry = countries.filter((country) => ( country.id == c ))

        if (foundCountry.length >= 1) {
            const foundVideo = foundCountry[0].videos.filter((video) => (video.id == v))

            if (foundVideo.length >= 1) {
                setCurrentCountry(foundCountry[0]);
                setCurrentVideo(foundVideo[0]);
            }
        }
    }, [c, v]);

    useEffect(() => {
        if(player) {
            if(volume != '0') {
                player.unMute();
                player.setVolume(parseInt(volume));
            }
        }
    }, [volume, player])


    useEffect(() => {
        setTitle(`${currentVideo?.country}, ${currentVideo?.place}`);
        setOriginURL(window.location.origin)
    }, [currentVideo]);

    return (
        <div className={`w-full h-full`}>
            <div className='w-screen h-screen bg-black justify-center items-center flex'>
                {!playing && (
                    <div className="custom-loader"></div>
                )}
                <YouTube
                    iframeClassName={`w-screen h-screen ${!playing && 'hidden'}`}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                            accelerometer: 1, 
                            'clipboard-write': 1, 
                            'encrypted-media': 1, 
                            gyroscope: 1,
                            'picture-in-picture': 1, 
                            'web-share': 1,
                            controls: 0,
                            origin: originURL
                        },
                    }}
                    videoId={currentVideo?.vid}
                    onStateChange={onStateChange}
                    onReady={onReady}
                    style={{ pointerEvents: 'none' }}
                />
            </div>
        </div>
    )
}

export default video