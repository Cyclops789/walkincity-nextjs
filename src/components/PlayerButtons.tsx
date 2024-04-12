import React, { useState, SetStateAction, Dispatch, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faShuffle, faCompress, faVolumeOff, faExpand, faShare, faVolumeLow, faSliders, faInfo } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FullScreenHandle } from 'react-full-screen';
import { INotificationType } from './Notification';
import { ICountryRes, IVideosRes } from '@/components/SideBar';
import { MutableRefObject } from 'react';
import useClickOutside, { useClickOutsideNoIgnore } from './Dashboard/useClickOutside';
import { Tooltip } from "@material-tailwind/react";

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
    setVolume: Dispatch<SetStateAction<string>>;
    setReactionsShow: Dispatch<SetStateAction<boolean>>;
    setViewersShow: Dispatch<SetStateAction<boolean>>;
    reactionsShow: boolean;
    viewersShow: boolean;
}

function PlayerButtons({ handleFullScreen, currentCountry, currentVideo, setVolume, volume, ended, setEnded, setActionOpen, actionButtonRef, reactionsShow, setReactionsShow, viewersShow, setViewersShow }: IPlayerButtons) {
    const [fullScreen, setFullScreen] = useState(false);
    const [openVolume, setOpenVolume] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [copyContent, setCopyContent] = useState('Click to copy the link');
    const wrapperRef = useRef(null);
    const settingsRef = useRef(null);
    const settingsRefButton = useRef(null);

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
        
        setCopyContent('Copied!');
        setTimeout(() => {
            setCopyContent('Click to copy the link');
        }, 7000);
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(e.target.value)
    }

    const changeUserSetting = (key: string, value: any) => {
        if(window !== undefined) {
            localStorage.setItem(key, `${value}`);
        }
    }

    useEffect(() => {
        const reactions = localStorage.getItem('reactions') == 'false' ? false : true;
        const viewers = localStorage.getItem('viewers') == 'false' ? false : true;

        setReactionsShow(reactions)
        setViewersShow(viewers)
    }, []);

    useClickOutsideNoIgnore(wrapperRef, () => setOpenVolume(false));
    useClickOutside(settingsRef, () => setOpenSetting(false), settingsRefButton);

    return (
        <>
            <Tooltip className={'bg-white text-black'} content="Volume" placement="left">
                <div ref={wrapperRef} className={`fixed top-[50px] right-3 cursor-pointer border border-white hover:bg-white hover:border-black hover:text-black h-9 flex rounded-full items-center justify-center ${openVolume ? 'w-52 bg-white text-black border-black' : 'w-9 text-white'} transition-all duration-100 ease-in-out`}>
                    <div onClick={() => setOpenVolume(!openVolume)} className='fixed top-[50px] right-3 w-9 h-9 z-10' />
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
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Random video" placement="left">
                <div onClick={randomVideo} className='fixed top-[100px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[20px]' icon={faShuffle} />
                </div>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Watch in youtube" placement="left">
                <a href={`https://youtube.com/watch?v=${currentVideo?.vid}`} target="_blank" rel="noreferrer" className='fixed top-[150px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[20px]' icon={faYoutube} />
                </a>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Toggle full-screen" placement="left">
                <div onClick={toggleFullScreen} className='fixed top-[200px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    {fullScreen ? (
                        <FontAwesomeIcon className='w-[20px]' icon={faCompress} />
                    ) : (
                        <FontAwesomeIcon className='w-[20px]' icon={faExpand} />
                    )}
                </div>
            </Tooltip>
            
            <Tooltip className={'bg-white text-black'} content={copyContent} placement="left">
                <div onClick={copyToClipBoard} className='fixed top-[250px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[20px]' icon={faShare} />
                </div>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Links" placement="left">
                <div ref={actionButtonRef} onClick={() => setActionOpen(true)} className='fixed top-[300px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[20px]' icon={faInfo} />
                </div>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Preferences" placement="left">
                <div ref={settingsRefButton} onClick={() => setOpenSetting(!openSetting)} className='fixed top-[350px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[15px]' icon={faSliders} />
                </div>
            </Tooltip>

            <div ref={settingsRef} className={`${openSetting ? 'fixed' : 'hidden'} top-[380px] right-[50px] bg-white rounded w-[200px] z-[9999]`}>
                <div className={'p-3'}>
                    <div className='flex justify-between'>Reactions <input type="checkbox" checked={reactionsShow} onChange={(e) => {setReactionsShow(e.target.checked); changeUserSetting('reactions', e.target.checked)}} /></div>
                    <div className='flex justify-between'>Viewers <input type="checkbox" checked={viewersShow} onChange={(e) => {setViewersShow(e.target.checked); changeUserSetting('viewers', e.target.checked)}} /></div>
                </div>
            </div>
        </>
    )
}

export default PlayerButtons