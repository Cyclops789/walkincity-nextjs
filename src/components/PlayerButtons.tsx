import React, { useState, SetStateAction, Dispatch, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faShuffle, faCompress, faVolumeOff, faExpand, faShare, faVolumeLow, faSliders, faInfo, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ICountryRes, IVideosRes } from '@/components/SideBar';
import { MutableRefObject } from 'react';
import { Tooltip } from "@material-tailwind/react";
import { useOnClickOutside } from 'usehooks-ts';
import useClickOutside, { useClickOutsideNoIgnore } from '@/components/Dashboard/useClickOutside';

interface IPlayerButtons {
    ended: boolean;
    volume: string;
    actionButtonRef: MutableRefObject<null>;
    setEnded: Dispatch<SetStateAction<boolean>>;
    setActionOpen: Dispatch<SetStateAction<boolean>>;
    currentVideo: IVideosRes | undefined;
    currentCountry: ICountryRes | undefined;
    setCurrentCountry: Dispatch<SetStateAction<ICountryRes | undefined>>;
    setCurrentVideo: Dispatch<SetStateAction<IVideosRes | undefined>>;
    setVolume: Dispatch<SetStateAction<string>>;
    setReactionsShow: Dispatch<SetStateAction<boolean>>;
    setViewersShow: Dispatch<SetStateAction<boolean>>;
    reactionsShow: boolean;
    viewersShow: boolean;
}

function PlayerButtons({ currentCountry, currentVideo, setVolume, volume, ended, setEnded, setActionOpen, actionButtonRef, reactionsShow, setReactionsShow, viewersShow, setViewersShow }: IPlayerButtons) {
    const [fullScreen, setFullScreen] = useState(false);
    const [openVolume, setOpenVolume] = useState<boolean | undefined>();
    const [openSetting, setOpenSetting] = useState(false);
    const [copyContent, setCopyContent] = useState('Click to copy the link');
    const volumeRef = useRef(null);
    const volumeInputRef = useRef(null);
    const settingsRef = useRef(null);

    const toggleFullScreen = (elem: any) => {
        const doc = document as unknown as any;

        if ((doc.fullScreenElement !== undefined && doc.fullScreenElement === null) ||
            (doc.msFullscreenElement !== undefined && doc.msFullscreenElement === null) ||
            (doc.mozFullScreen !== undefined && !doc.mozFullScreen) ||
            (doc.webkitIsFullScreen !== undefined && !doc.webkitIsFullScreen)
        ) {
            try {
                if (elem.requestFullScreen) {
                    elem.requestFullScreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullScreen) {
                    elem.webkitRequestFullScreen((Element as any).ALLOW_KEYBOARD_INPUT);
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
                setFullScreen(true);
            } catch (error) {
                console.error('There was an error requesting requestFullscreen: ', error);
            }
        } else {
            try {
                if (doc.cancelFullScreen) {
                    doc.cancelFullScreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitCancelFullScreen) {
                    doc.webkitCancelFullScreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                }
                setFullScreen(false);
            } catch (error) {
                console.error('There was an error requesting cancelFullscreen: ', error);
            }
        }
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
        if (window !== undefined) {
            localStorage.setItem(key, `${value}`);
        }
    }

    useEffect(() => {
        const reactions = localStorage.getItem('reactions') == 'false' ? false : true;
        const viewers = localStorage.getItem('viewers') == 'false' ? false : true;

        setReactionsShow(reactions);
        setViewersShow(viewers);
    }, []);

    useClickOutside(volumeRef, () => setOpenVolume(false), volumeInputRef);
    useClickOutsideNoIgnore(settingsRef, () => setOpenSetting(false));
    //useOnClickOutside(settingsRef, () => setOpenSetting(false));

    return (
        <>
            <Tooltip className={'bg-white text-black'} content="Volume" placement="left">
                <div 
                    className={`fixed top-[50px] right-3 cursor-pointer border border-white hover:bg-white hover:border-black hover:text-black h-9 flex rounded-full items-center justify-center ${openVolume ? 'w-52 bg-white text-black border-black' : 'w-9 text-white'} transition-all duration-100 ease-in-out`}
                >
                    <div ref={volumeRef} onClick={() => setOpenVolume(true)} className='fixed top-[50px] right-3 w-9 h-9 z-10' />
                    <FontAwesomeIcon
                        className={`${parseInt(volume) >= 50 ? 'w-[20px]' : parseInt(volume) >= 20 ? 'w-[15px]' : 'w-[10px]'} fixed ${parseInt(volume) >= 50 ? 'right-5' : parseInt(volume) >= 20 ? 'right-6' : 'right-7'} z-0`}
                        icon={parseInt(volume) >= 50 ? (faVolumeHigh) : parseInt(volume) >= 20 ? (faVolumeLow) : faVolumeOff}
                    />
                    <input
                        ref={volumeInputRef}
                        min={-1}
                        max={100}
                        step={10}
                        value={parseInt(volume)}
                        onChange={changeVolume}
                        type="range"
                        className={`${!openVolume && 'hidden'} w-[170px] mr-6`}
                    />
                </div>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Random video" placement="left">
                <div onClick={() => setEnded(!ended)} className='fixed top-[100px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[20px]' icon={faShuffle} />
                </div>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Watch in youtube" placement="left">
                <a href={`https://youtube.com/watch?v=${currentVideo?.vid}`} target="_blank" rel="noreferrer" className='fixed top-[150px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
                    <FontAwesomeIcon className='w-[20px]' icon={faYoutube} />
                </a>
            </Tooltip>

            <Tooltip className={'bg-white text-black'} content="Toggle full-screen" placement="left">
                <div onClick={() => toggleFullScreen(document.body)} className='fixed top-[200px] right-3 cursor-pointer text-white border border-white hover:bg-white hover:border-black hover:text-black w-9 h-9 flex rounded-full items-center justify-center'>
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

            <Tooltip className={`${openSetting && '!hidden' } bg-white text-black`} content="Preferences" placement="left">
                <div 
                    ref={settingsRef} 

                    className={`transition-all duration-100 fixed top-[350px] right-3 ease-in-out ${openSetting ? 'w-[200px] h-[100px] rounded-lg bg-white text-black' : 'w-9 h-9 rounded-full text-white' } cursor-pointer border border-white hover:bg-white hover:border-black hover:text-black`}
                >
                    <div 
                        onClick={() => {if(!openSetting){setOpenSetting(true)}else{setOpenSetting(false)}}} 
                        className={'relative w-full h-[30px]'}
                    >    
                        <FontAwesomeIcon 
                            className={'absolute z-[9998] top-[9px] right-[9px]'} 
                            icon={!openSetting ? faSliders : faXmark} 
                        />
                    </div>
                    <div className={`${!openSetting && 'hidden'} rounded w-[200px]`}>
                        <div className={'p-3'}>
                            <div className={'flex justify-between'}>Reactions <input type="checkbox" checked={reactionsShow} onChange={(e) => { setReactionsShow(e.target.checked); changeUserSetting('reactions', e.target.checked) }} /></div>
                            <div className={'flex justify-between'}>Viewers <input type="checkbox" checked={viewersShow} onChange={(e) => { setViewersShow(e.target.checked); changeUserSetting('viewers', e.target.checked) }} /></div>
                        </div>
                    </div>
                </div>
            </Tooltip>
        </>
    )
}

export default PlayerButtons;