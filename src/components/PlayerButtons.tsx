import React, { useState, SetStateAction, Dispatch, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faShuffle, faCompress, faVolumeOff, faExpand, faShare, faVolumeLow, faPlus, faInfo } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FullScreenHandle } from 'react-full-screen';
import { INotificationType } from './Notification';
import { ICountryRes, IVideosRes } from '@/components/SideBar';
import { MutableRefObject } from 'react';

interface IPlayerButtons {
    ended: boolean;
    volume: string;
    actionButtonRef: MutableRefObject<null>;
    setEnded: Dispatch<SetStateAction<boolean>>;
    setActionOpen: Dispatch<SetStateAction<boolean>>;
    currentVideo: IVideosRes | undefined;
    currentCountry: ICountryRes | undefined;
    handleFullScreen: FullScreenHandle;
    setCurrentCountry: Dispatch<SetStateAction<ICountryRes | undefined>>;
    setCurrentVideo: Dispatch<SetStateAction<IVideosRes | undefined>>;
    setNotify: Dispatch<SetStateAction<INotificationType>>;
    setVolume: Dispatch<SetStateAction<string>>;
}

function PlayerButtons({ handleFullScreen, setNotify, currentCountry, currentVideo, setVolume, volume, ended, setEnded, setActionOpen, actionButtonRef }: IPlayerButtons) {
    const [fullScreen, setFullScreen] = useState(false);
    const [openVolume, setOpenVolume] = useState(false);
    const wrapperRef = useRef(null);

    const toggleFullScreen = () => {
        if (handleFullScreen.active) {
            handleFullScreen.exit().finally(() => {
                setFullScreen(false);
            })
        } else {
            handleFullScreen.enter().finally(() => {
                setFullScreen(true);
            })
        }
    }

    const randomVideo = () => {
        setEnded(!ended);
    }

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/?v=${currentVideo?.id}&c=${currentCountry?.id}`);
        setNotify({ open: true, type: 'bg-white', text: 'Copied !' })
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(e.target.value)
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenVolume(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    return (
        <>
            <div ref={wrapperRef} className={`fixed top-[50px] right-3 cursor-pointer  border border-white hover:bg-white hover:border-black hover:text-black h-9 flex rounded-full items-center justify-center ${openVolume ? 'w-52 bg-white text-black border-black' : 'w-9 text-white'} transition-all duration-100 ease-in-out`}>
                <div  onClick={() => setOpenVolume(!openVolume)} className='fixed top-[50px] right-3 w-9 h-9 z-10' />
                <FontAwesomeIcon 
                    className={`${parseInt(volume) >= 50 ? 'w-[20px]' : parseInt(volume) >= 20 ? 'w-[15px]' : 'w-[10px]'} fixed ${parseInt(volume) >= 50 ? 'right-5' : parseInt(volume) >= 20 ? 'right-6' : 'right-7'} z-0`}
                    icon={parseInt(volume) >= 50 ? (faVolumeHigh) : parseInt(volume) >= 20 ? (faVolumeLow) : faVolumeOff} 
                />
                <input
                    min={-1}
                    max={100}
                    step={10}
                    defaultValue={0}
                    onChange={changeVolume}
                    type="range"
                    className={`${!openVolume && 'hidden'} w-[170px] mr-6`}
                />
            </div>     

            <div onClick={randomVideo} className='fixed top-[100px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                <FontAwesomeIcon className='w-[20px]' icon={faShuffle} />
            </div>

            <a href={`https://youtube.com/watch?v=${currentVideo?.vid}`}  target="_blank" rel="noreferrer" className='fixed top-[150px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                <FontAwesomeIcon className='w-[20px]' icon={faYoutube} />
            </a>

            <div onClick={toggleFullScreen} className='fixed top-[200px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                {fullScreen ? (
                    <FontAwesomeIcon className='w-[20px]' icon={faCompress} />
                ) : (
                    <FontAwesomeIcon className='w-[20px]' icon={faExpand} />
                )}
            </div>

            <div onClick={copyToClipBoard} className='fixed top-[250px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                <FontAwesomeIcon className='w-[20px]' icon={faShare} />
            </div>
            
            <div ref={actionButtonRef} onClick={() => setActionOpen(true)} className='fixed top-[300px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                <FontAwesomeIcon className='w-[20px]' icon={faInfo} />
            </div>
        </>
    )
}

export default PlayerButtons