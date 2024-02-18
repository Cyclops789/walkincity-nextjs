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
    type: 'walk' | 'drive';
}

interface ISideBar {
    countries: ICountryRes[];
    setCurrentCountry: Dispatch<SetStateAction<ICountryRes | undefined>>;
    currentCountry: ICountryRes | undefined;
    currentVideo: IVideosRes | undefined;
    setCurrentVideo: Dispatch<SetStateAction<IVideosRes | undefined>>;
    ended: boolean;
    setEnded: Dispatch<SetStateAction<boolean>>;
}

interface IUserCountSideBar {
    vid: string;
    connectors: string;
}

function sideBar({ countries, currentVideo, setCurrentVideo, ended, setEnded, setCurrentCountry, currentCountry }: ISideBar) {
    const socketRef = useRef<any>();
    const [connectors, setConnectors] = useState<IUserCountSideBar[]>();
    const [open, setOpen] = useState(false);
    const [weatherFilter, setWeatherFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const [continentFilter, setContinentFilter] = useState('');
    const [countryOpen, setCountryOpen] = useState({ id: 0, state: false });
    const [getCountries, setCountries] = useState<ICountryRes[]>(countries);
    const [search, setSearch] = useState(false);
    const wrapperRef = useRef(null);

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
    }, [ended])

    useEffect(() => {
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

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
        fetch("/api/socket/io").finally(() => {
            socketRef.current = io();

            socketRef.current.on(`usersCount`, (usersCount: IUserCountSideBar[]) => {
                setConnectors(usersCount)
            });

            return () => {
                socketRef.current.disconnect();
            };
        })
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`fixed ${open ? 'bg-[rgba(0,0,0,.7)] overflow-auto' : ''} h-screen max-w-[320px] w-[320px] flex`}
            style={{
                transition: 'all 0.7s ease',
                zIndex: 10,
                transform: open ? 'translate(0)' : 'translate(-83%)',
            }}
        >
            <div className='max-w-[260px]'>
                <div className="flex flex-wrap space-x-2 space-y-2  justify-between">
                    <div
                        onClick={() => {
                            if (continentFilter == 'Africa') {
                                setContinentFilter('');
                            } else {
                                setContinentFilter('Africa');
                            }
                        }}
                        title="Africa"
                        className={`rounded ml-2 mt-2 px-3 py-2 cursor-pointer ${continentFilter == 'Africa' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faEarthAfrica}
                        />
                    </div>
                    <div
                        onClick={() => {
                            if (continentFilter == 'Asia') {
                                setContinentFilter('');
                            } else {
                                setContinentFilter('Asia');
                            }
                        }}
                        title="Asia"
                        className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Asia' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faEarthAsia}
                        />
                    </div>
                    <div
                        onClick={() => {
                            if (continentFilter == 'Europe') {
                                setContinentFilter('');
                            } else {
                                setContinentFilter('Europe');
                            }
                        }}
                        title="Europe"
                        className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Europe' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faEarthEurope}
                        />
                    </div>
                    <div
                        onClick={() => {
                            if (continentFilter == 'Americas') {
                                setContinentFilter('');
                            } else {
                                setContinentFilter('Americas');
                            }
                        }}
                        title="Americas"
                        className={`rounded px-3 py-2 cursor-pointer ${continentFilter == 'Americas' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faEarthAmericas}
                        />
                    </div>
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
                </div>

                <div className="flex flex-wrap space-x-2 space-y-2 pb-2 justify-between">
                    <div
                        title="Day"
                        className={`rounded ml-2 mt-2 px-3 py-2 cursor-pointer ${weatherFilter == 'weather-normal-morning' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        onClick={() => { changeWeatherFilter('weather-normal-morning') }}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faSun}
                        />
                    </div>
                    <div
                        title="Night"
                        className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-normal-night' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        onClick={() => { changeWeatherFilter('weather-normal-night') }}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faMoon}
                        />
                    </div>
                    <div
                        title="Raining"
                        className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-rain-' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        onClick={() => { changeWeatherFilter('weather-rain-') }}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faCloudRain}
                        />
                    </div>
                    <div
                        title="Cloudy"
                        className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-cloud-morning' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        onClick={() => { changeWeatherFilter('weather-cloud-morning') }}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faCloud}
                        />
                    </div>
                    <div
                        title="Snowing"
                        className={`rounded px-3 py-2 cursor-pointer ${weatherFilter == 'weather-snow-' ? 'bg-gray-800 text-white' : 'bg-white'}`}
                        onClick={() => { changeWeatherFilter('weather-snow-') }}
                    >
                        <FontAwesomeIcon
                            size='lg'
                            icon={faSnowflake}
                        />
                    </div>
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
                    {getCountries.map((country: ICountryRes, index: number) => (
                        <div
                            key={`country-${country.id}`}
                            style={{
                                borderColor: country.border_color,
                                marginBottom: index + 1 === getCountries.length ? '7px' : '0px',
                            }}
                            className={`border-r-[5px] py-3 w-full text-center rounded bg-white cursor-pointer relative overflow-hidden ${(countryOpen.id === country.id && countryOpen.state === true) ? 'h-auto' : ''}`}
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

                            <div className="flex items-center justify-center h-full">
                                <FontAwesomeIcon
                                    style={{
                                        animation: `${((currentCountry?.id === country.id || country?.videos.includes(currentVideo as IVideosRes)) && (countryOpen.id !== country.id && countryOpen.state !== true)) && 'currentLableCountry'} 1s ease 0s infinite normal none`,
                                        color: `${(currentCountry?.id === country.id || country?.videos.includes(currentVideo as IVideosRes)) ? 'var(--primary-text-color)' : 'black'}`,
                                    }}
                                    className={`absolute top-3.5 right-5 ${currentCountry !== country && 'transition-transform duration-200 ease-in-out'} ${(countryOpen.id === country.id && countryOpen.state === true) ? 'rotate-[90deg]' : ''}`}
                                    size='lg'
                                    icon={faChevronRight}
                                />
                            </div>

                            <div className={`ml-3 mt-[35px] grid justify-start items-start ${(countryOpen.id === country.id && countryOpen.state === true) ? '' : 'hidden'}`}>
                                {country.videos.map((video: IVideosRes) => (
                                    <div key={video.vid} onClick={() => { setCurrentCountry(country); setCurrentVideo(video) }} className={`cursor-pointer ${currentVideo === video ? 'text-blue-400' : 'hover:text-blue-400'}`}>
                                        {video.country}, {video.place}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center w-[60px]'>
                <div className={`text-white mt-3`}>
                    <FontAwesomeIcon className='cursor-pointer' size={"2x"} icon={faBars} onClick={() => setOpen(!open)} />
                </div>
            </div>
        </div>
    )
}

export default sideBar
