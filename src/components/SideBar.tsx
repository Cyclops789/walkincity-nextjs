import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';
import {
    faBars,
    faMagnifyingGlass,
    faEarthAfrica,
    faEarthAsia,
    faEarthEurope,
    faEarthAmericas,
    faEarthOceania,
    faSun,
    faMoon,
    faCloudRain,
    faSnowflake,
    faCloud,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Tooltip } from '@material-tailwind/react';
import { useOnClickOutside } from 'usehooks-ts';

export interface ICountryRes {
    id: number;
    short_name: string;
    long_name: string;
    border_color: string;
    continent: string;
    videos: IVideosRes[];
}

export interface IVideosRes {
    id: number;
    vid: string;
    country: string;
    place: string;
    continent: string;
    weather: string;
    seekTo: number;
    endsat: number;
    latitude?: number;
    longitude?: number;
    type: 'walk' | 'drive';
}

interface ISideBar {
    countries: ICountryRes[];
    cn: string | undefined;
    setCurrentCountry: Dispatch<SetStateAction<ICountryRes | undefined>>;
    currentCountry: ICountryRes | undefined;
    currentVideo: IVideosRes | undefined;
    setCurrentVideo: Dispatch<SetStateAction<IVideosRes | undefined>>;
    ended: boolean;
    setEnded: Dispatch<SetStateAction<boolean>>;
    setSideBarOpen: Dispatch<SetStateAction<boolean>>;
    sideBarOpen: boolean;
}

interface IUserCountSideBar {
    vid: string;
    connectors: string;
}

function sideBar({ cn, countries, currentVideo, setCurrentVideo, ended, setEnded, setCurrentCountry, currentCountry, setSideBarOpen, sideBarOpen }: ISideBar) {
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
    const [connectors, setConnectors] = useState<IUserCountSideBar[]>();
    const [weatherFilter, setWeatherFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [continentFilter, setContinentFilter] = useState('');
    const [countryOpen, setCountryOpen] = useState({ id: 0, state: false });
    const [getCountries, setCountries] = useState<ICountryRes[]>(countries);
    const [search, setSearch] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    const changeWeatherFilter = (weather: string) => {
        if (weatherFilter == weather) {
            setWeatherFilter('');
        } else {
            setWeatherFilter('');
            setTimeout(() => {
                setWeatherFilter(weather);
            }, 50);
        }
    }

    useEffect(() => {
        // Set the first video
        outerLoop: for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            for (let j = 0; j < country.videos.length; j++) {
                const video = country.videos[j];
                if (video.vid) {
                    setCurrentVideo(video);
                    setCurrentCountry(country);
                    break outerLoop;
                }
            }
        }
    }, []);

    useEffect(() => {
        if (ended) {
            // pick random video
            const randomCountryIndex = Math.floor(Math.random() * countries.length);
            const randomVideoIndex = Math.floor(Math.random() * countries[randomCountryIndex].videos.length);
            setCurrentCountry(countries[randomCountryIndex]);
            setCurrentVideo(countries[randomCountryIndex].videos[randomVideoIndex]);
        }
    }, [ended]);

    // Filter Countries using the search input
    useEffect(() => {
        if (countryFilter === '') {
            setCountries(countries);
        }
    }, [countryFilter]);

    useEffect(() => {
        if (countryFilter !== '') {
            setCountries(countries.filter(item => item.long_name.toLowerCase().includes(countryFilter.toLowerCase())))
        }
    }, [search]);

    // Filter the Countries using the continent buttons
    useEffect(() => {
        if (continentFilter === '') {
            setCountries(countries);
        }
    }, [continentFilter]);

    useEffect(() => {
        if (continentFilter != '') {
            setCountries(countries.filter(item => item.continent.toLowerCase().includes(continentFilter.toLowerCase())))
        }
    }, [continentFilter]);

    // Filter the videos using the weather filter buttons 
    useEffect(() => {
        if (weatherFilter === '') {
            setCountries(countries);
        }
    }, [weatherFilter]);

    useEffect(() => {
        if (weatherFilter !== '') {
            setCountries((prevCountries) => {
                let filteredCountries: ICountryRes[] = [];

                prevCountries.forEach((country) => {
                    country.videos?.forEach((video) => {
                        if (video.weather.includes(weatherFilter.toLowerCase())) {
                            if (!filteredCountries.find((c) => c.id === country.id)) {
                                const newCountry = { ...country, videos: [video] };
                                filteredCountries.push(newCountry);
                            } else {
                                const existingCountry = filteredCountries.find((c) => c.id === country.id);
                                existingCountry?.videos.push(video);
                            }
                        }
                    });
                });

                return filteredCountries;
            });
        }
    }, [weatherFilter]);

    useEffect(() => {
        if (cn) {
            setSearch(!search);
            setCountryFilter(cn);
        }
    }, [cn])

    useEffect(() => {
        fetch("/api/socket/io").finally(() => {
            socketRef.current = io();

            socketRef.current.on(`usersCount`, (usersCount: IUserCountSideBar[]) => {
                setConnectors(usersCount);
            });

            return () => {
                socketRef.current?.disconnect();
            };
        })
    }, []);

    useOnClickOutside(wrapperRef, () => setSideBarOpen(false));
    
    return (
        <div
            ref={wrapperRef}
            className={`fixed ${sideBarOpen ? 'bg-[rgba(0,0,0,.7)] overflow-auto' : ''} h-screen max-w-[320px] w-[320px] flex`}
            style={{
                transition: 'all 0.7s ease',
                zIndex: 10,
                transform: sideBarOpen ? 'translate(0)' : 'translate(-83%)',
            }}
        >
            <div className='max-w-[260px]'>
                <div className="flex flex-wrap space-x-2 space-y-2  justify-between">
                    <Tooltip className={'border border-red-600 text-red-600'} content="Africa" placement="bottom">
                        <div
                            onClick={() => {
                                if (continentFilter == 'Africa') {
                                    setContinentFilter('');
                                } else {
                                    setContinentFilter('Africa');
                                }
                            }}
                            title='Africa'
                            className={`rounded ml-2 mt-2 px-3 py-2 cursor-pointer ${continentFilter == 'Africa' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        >
                            <FontAwesomeIcon
                                size='lg'
                                icon={faEarthAfrica}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Asia" placement="bottom">
                        <div
                            onClick={() => {
                                if (continentFilter == 'Asia') {
                                    setContinentFilter('');
                                } else {
                                    setContinentFilter('Asia');
                                }
                            }}
                            title='Asia'
                            className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Asia' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        >
                            <FontAwesomeIcon
                                size='lg'
                                icon={faEarthAsia}
                            />
                        </div>
                    </Tooltip>


                    <Tooltip className={'border border-red-600 text-red-600'} content="Europe" placement="bottom">
                        <div
                            onClick={() => {
                                if (continentFilter == 'Europe') {
                                    setContinentFilter('');
                                } else {
                                    setContinentFilter('Europe');
                                }
                            }}
                            title='Europe'
                            className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Europe' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        >
                            <FontAwesomeIcon
                                size='lg'
                                icon={faEarthEurope}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Americas" placement="bottom">
                        <div
                            onClick={() => {
                                if (continentFilter == 'Americas') {
                                    setContinentFilter('');
                                } else {
                                    setContinentFilter('Americas');
                                }
                            }}
                            title='Americas'
                            className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Americas' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        >
                            <FontAwesomeIcon
                                size='lg'
                                icon={faEarthAmericas}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Oceania" placement="bottom">
                        <div
                            onClick={() => {
                                if (continentFilter == 'Oceania') {
                                    setContinentFilter('');
                                } else {
                                    setContinentFilter('Oceania');
                                }
                            }}
                            title="Oceania"
                            className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Oceania' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        >
                            <FontAwesomeIcon
                                size='lg'
                                icon={faEarthOceania}
                            />
                        </div>
                    </Tooltip>
                </div>

                <div className="flex flex-wrap space-x-2 space-y-2 pb-2 justify-between">
                    <Tooltip className={'border border-red-600 text-red-600'} content="Day" placement="bottom">
                        <div
                            title="Day"
                            className={`rounded ml-2 mt-2 px-3 py-2 cursor-pointer ${weatherFilter == 'weather-normal-morning' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                            onClick={() => { changeWeatherFilter('weather-normal-morning') }}
                        >
                            <FontAwesomeIcon
                                className='w-[20px]'
                                size='lg'
                                icon={faSun}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Night" placement="bottom">
                        <div
                            title="Night"
                            className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-normal-night' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                            onClick={() => { changeWeatherFilter('weather-normal-night') }}
                        >
                            <FontAwesomeIcon
                                className='w-[20px]'
                                size='lg'
                                icon={faMoon}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Raining" placement="bottom">
                        <div
                            title="Raining"
                            className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-rain-' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                            onClick={() => { changeWeatherFilter('weather-rain-') }}
                        >
                            <FontAwesomeIcon
                                className='w-[20px]'
                                size='lg'
                                icon={faCloudRain}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Cloudy" placement="bottom">
                        <div
                            title="Cloudy"
                            className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-cloud-morning' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                            onClick={() => { changeWeatherFilter('weather-cloud-morning') }}
                        >
                            <FontAwesomeIcon
                                className='w-[20px]'
                                size='lg'
                                icon={faCloud}
                            />
                        </div>
                    </Tooltip>

                    <Tooltip className={'border border-red-600 text-red-600'} content="Snowing" placement="bottom">
                        <div
                            title="Snowing"
                            className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-snow-' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                            onClick={() => { changeWeatherFilter('weather-snow-') }}
                        >
                            <FontAwesomeIcon
                                className='w-[20px]'
                                size='lg'
                                icon={faSnowflake}
                            />
                        </div>
                    </Tooltip>
                </div>

                <form action={''} onSubmit={(e) => { e.preventDefault(); setSearch(!search) }} className='ml-2 pb-2 flex space-x-2'>
                    <input
                        type="text"
                        className='rounded px-1 w-[200px]'
                        placeholder='Search...'
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                    />

                    <button type='submit' className={'px-3 py-2 bg-white rounded cursor-pointer'}>
                        <FontAwesomeIcon size='lg' icon={faMagnifyingGlass} />
                    </button>
                </form>

                <div className='ml-2 space-y-2'>
                    <div 
                        onClick={() => router.push('/global')}
                        className={'py-3 w-full text-center rounded bg-white hover:bg-slate-200 cursor-pointer relative overflow-hidden'}
                    >
                            <Image
                                alt=''
                                height={1}
                                width={70}
                                src={`/earth/earth-overview.png`}
                                className="absolute top-[8px] left-[-8px] h-auto transform -translate-y-1/2 rotate-[-49deg]"
                            />
                        Global Mode
                    </div>
                    {getCountries.map((country: ICountryRes, index: number) => (
                        <div
                            key={`country-${country.id}`}
                            style={{
                                borderColor: country.border_color,
                                marginBottom: index + 1 === getCountries.length ? '7px' : '0px',
                            }}
                            className={`border-r-[5px] hover:bg-slate-200 py-3 w-full text-center rounded bg-white cursor-pointer relative overflow-hidden ${(countryOpen.id === country.id && countryOpen.state === true) ? 'h-auto' : ''}`}
                            onClick={() => {
                                if (countryOpen.id === country.id && countryOpen.state === true) {
                                    setCountryOpen({ id: 0, state: false })
                                } else {
                                    setCountryOpen({ id: country.id, state: true })
                                }
                            }}
                        >
                            <Image
                                alt=''
                                height={1}
                                width={100}
                                src={`/flags/${country.short_name.toLowerCase()}.png`}
                                className="border border-black absolute top-[0.9rem] left-[-27px] h-auto transform -translate-y-1/2 rotate-[-49deg]"
                            />

                            <div className='my-[-4px] pl-[70px] text-start'>
                                <div className='text-sm font-semibold'>{country.long_name}</div>
                                <div className='text-sm'>{connectors?.reduce((accumulator, connector) => { const filteredVideos = country.videos.filter((video) => video.vid === connector.vid); return accumulator + filteredVideos.length }, 0) || 0} watching</div>
                            </div>

                            <div className="flex items-center justify-center h-full relative">
                                <FontAwesomeIcon
                                    style={{
                                        animation: `${((currentCountry?.id === country.id || country?.videos.includes(currentVideo as IVideosRes)) && (countryOpen.id !== country.id && countryOpen.state !== true)) && 'clc1'} 1s ease 0s infinite normal none`,
                                        color: `${(currentCountry?.id === country.id || country?.videos.includes(currentVideo as IVideosRes)) ? 'var(--primary-text-color)' : 'black'}`,
                                    }}
                                    className={`absolute top-[-25px] right-[14px] ${currentCountry !== country && 'transition-transform duration-200 ease-in-out'} ${(countryOpen.id === country.id && countryOpen.state === true) ? 'rotate-[90deg]' : ''}`}
                                    size='lg'
                                    icon={faChevronRight}
                                />
                            </div>

                            <div className={`ml-3 mt-[35px] grid justify-start items-start ${(countryOpen.id === country.id && countryOpen.state === true) ? '' : 'hidden'}`}>
                                {country.videos.map((video: IVideosRes) => (
                                    <div key={video.vid} onClick={() => { setCurrentCountry(country); setCurrentVideo(video) }} className={`text-start cursor-pointer ${currentVideo === video ? 'text-blue-400' : 'hover:text-blue-400'}`}>
                                        {video.place}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center w-[60px]'>
                <div className={`text-white mt-3`}>
                    <FontAwesomeIcon className='cursor-pointer' size={"2x"} icon={faBars} onClick={() => setSideBarOpen(!sideBarOpen)} />
                </div>
            </div>
        </div>
    )
}

export default sideBar
