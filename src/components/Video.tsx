
import React, { useEffect, useRef, useState } from 'react'
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Dispatch, SetStateAction } from 'react';
import { IVideosRes, ICountryRes } from '@/components/SideBar';

export interface IVideoComponent {
    v: number | undefined;
    c: number | undefined;
    cn: string | undefined;
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

function video({ v, setPlaying, playing, setTitle, currentVideo, setCurrentVideo, setCurrentCountry, currentCountry, countries, c, volume, setEnded, ended, cn }: IVideoComponent) {
    const [originURL, setOriginURL] = useState('');
    const ytPlayer = useRef<YouTubePlayer | null>(null);

    const onReady: YouTubeProps['onReady'] = (e) => {
        e.target.mute();
        e.target.playVideo();

        ytPlayer.current = e.target;
    }

    const onError: YouTubeProps['onError'] = (e) => {
        switch (e.data) {
            /**
             * The request contains an invalid parameter value. 
             * For example, this error occurs if you specify a video ID that does not 
             * have 11 characters, or if the video ID contains invalid characters, 
             * such as exclamation points or asterisks.
             */
            case 2:
                setEnded(!ended);
                break;
            /**
             * The requested content cannot be played in 
             * an HTML5 player or another error related 
             * to the HTML5 player has occurred.
             */
            case 5:
                setEnded(!ended);
                break;
            /**
             * The video requested was not found. 
             * This error occurs when a video has been removed 
             * (for any reason) or has been marked as private.
             */
            case 100:
                setEnded(!ended);
                break;

            /**
             * The owner of the requested video does not allow it 
             * to be played in embedded players.
             */
            case 101:
                setEnded(!ended);
                break;
            /**
             * This error is the same as 101. 
             * It's just a 101 error in disguise!
             */
            case 150:
                setEnded(!ended);
                break;
        }
    }

    const onStateChange: YouTubeProps['onStateChange'] = (e) => {
        switch (e.target.getPlayerState()) {
            case -1: // unstarted
                setPlaying(false);
                break;
            case 0: // ended
                setPlaying(false);
                setEnded(!ended);
                break;
            case 1: // playing - enable in production
                setPlaying(false);
                break;
            case 2: // paused
                setPlaying(false);
                e.target.playVideo();
                break;
            case 3: // buffering
                setPlaying(false);
                break;
            case 5: // video cued
                setPlaying(false);
                break;
        }
    }

    useEffect(() => {
        let foundCountry: ICountryRes[];

        if (cn) {
            foundCountry = countries.filter((country) => (country.long_name.toLowerCase() == cn.toLowerCase()))
        } else {
            foundCountry = countries.filter((country) => (country.id == c))
        }

        if (foundCountry.length >= 1) {
            const foundVideo = foundCountry[0].videos.filter((video) => (video.id == v))

            if (foundVideo.length >= 1) {
                setCurrentCountry(foundCountry[0]);
                setCurrentVideo(foundVideo[0]);
            }
        }
    }, [c, v, cn]);

    useEffect(() => {
        if (ytPlayer.current) {
            if (volume == '-1') {
                try {
                    ytPlayer.current.mute();
                } catch (error) {
                    console.error('There was an error trying to Mute the player', error);
                }
            }

            if (volume != '0') {
                try {
                    ytPlayer.current.unMute();
                    ytPlayer.current.setVolume(parseInt(volume));   
                } catch (error) {
                    console.error('There was an error trying to unMute or change the volume of the player', error);
                }
            }
        }
    }, [volume, ytPlayer.current])


    useEffect(() => {
        setTitle(`${currentVideo?.country}, ${currentVideo?.place}`);
        setOriginURL(window.location.origin)
    }, [currentVideo]);

    return (
        <div className={`w-full h-full`}>
            <div className='w-screen h-screen bg-black justify-center items-center flex overflow-hidden pointer-events-none'>
                {!playing && (
                    <div className={`w-full h-full bg-black flex justify-center items-center`}>
                        <div className="custom-loader">
                        </div>
                    </div>
                )}
                <YouTube
                    iframeClassName={`overflow-hidden w-full h-full ${!playing && 'hidden'} pointer-events-none`}
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
                            start: currentVideo?.seekTo || 1,
                            end: currentVideo?.endsat || '',
                            origin: originURL
                        },
                    }}

                    videoId={currentVideo?.vid}
                    onStateChange={onStateChange}
                    onError={onError}
                    onReady={onReady}
                    style={{
                        overflow: 'hidden',
                        width: !playing ? '0px' : '100%',
                        aspectRatio: '16/9',
                        pointerEvents: 'none'
                    }}
                />
            </div>
        </div>
    )
}

export default video;