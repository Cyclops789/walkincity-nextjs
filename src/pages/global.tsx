import { useState, useEffect, useRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import type { GetServerSideProps } from 'next'
import { IVideosRes } from '@/components/SideBar';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import randomcolor from 'randomcolor';
import { useRouter } from "next/router";
const Loading = () => {
    return (
        <div className='w-screen h-screen bg-black text-white justify-center items-center flex fixed text-xl z-[99999]'>Please wait, it might take some seconds to load the earth ...</div>
    )
}

const GlobeTmpl = dynamic(() => import("@/components/Globe"), {
    ssr: false,
    loading: () => <Loading />,
});

const Globe = forwardRef((props, ref) => (
    // @ts-ignore
    <GlobeTmpl {...props} forwardRef={ref} />
));

const World = ({ videos }: { videos: IVideosRes[] }) => {
    const router = useRouter();
    const globeRef = useRef(null);
    const [globeReady, setGlobeReady] = useState(false);
    const startTime = 1000;

    const markerSvg = `
        <svg viewBox="-4 0 36 36">
            <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
            <circle fill="black" cx="14" cy="14" r="7"></circle>
        </svg>
    `;

    useEffect(() => {
        if (!globeRef.current) {
            return;
        }
        const randomVideo = Math.floor(Math.random() * videos.length);

        (globeRef.current as any).pointOfView(
            {
                lat: videos[randomVideo].latitude,
                lng: videos[randomVideo].longitude,
                altitude: 0.5,
            },
            startTime
        );
        (globeRef.current as any).controls().autoRotate = false;
        (globeRef.current as any).controls().autoRotateSpeed = 1;
    }, [globeReady]);

    return (
        <>
            {!globeReady && (
                <Loading />
            )}
            <Globe
                // @ts-ignore
                globeImageUrl="earth/earth-textures.jpg"
                bumpImageUrl={"earth/earth-bump.jpg"}
                backgroundImageUrl="earth/space-textures.png"
                ref={globeRef}
                waitForGlobeReady={true}
                onGlobeReady={() => setGlobeReady(true)}
                htmlElementsData={videos}
                htmlLat={(data: IVideosRes) => data.latitude}
                htmlLng={(data: IVideosRes) => data.longitude}
                htmlElement={(d: IVideosRes) => {
                    const el = document.createElement('div');
                    el.innerHTML = markerSvg;
                    el.style.color = randomcolor();
                    el.style.width = `30px`;
                    el.style.pointerEvents = 'auto';
                    el.style.cursor = 'pointer';

                    el.addEventListener('mouseover', () => {
                        const tooltip = document.createElement('div');
                        tooltip.textContent = `${d.country}, ${d.place}`;
                        tooltip.style.position = 'absolute';
                        tooltip.style.backgroundColor = 'black';
                        tooltip.style.color = 'white';
                        tooltip.style.padding = '5px';
                        tooltip.style.borderRadius = '25px';
                        tooltip.style.width = 'auto'; 
                        tooltip.style.maxWidth = '200px';
                        tooltip.style.whiteSpace = 'nowrap';
                        tooltip.style.overflow = 'hidden';
                        tooltip.style.textOverflow = 'ellipsis';
                        tooltip.style.top = `${el.offsetTop - 30}px`; 
                        tooltip.style.left = `${el.offsetLeft}px`;
                        tooltip.style.zIndex = '999';
                        el.appendChild(tooltip);
                    });

                    // Remove tooltip on mouseout
                    el.addEventListener('mouseout', () => {
                        const tooltip = el.querySelector('div');
                        if (tooltip) {
                            el.removeChild(tooltip);
                        }
                    });

                    el.onclick = () => {
                        router.push({
                            pathname: '/',
                            query: {
                                'cn': d.country,
                                'v': d.id
                            },
                        });
                    };
                    return el;
                }}
            />
        </>
    );
};

export const getServerSideProps = (async () => {
    const videos = await executeQueryReturnsJSON({
        query: query.getAllVerifiedVideosForProduction,
        values: [],
    }) as IVideosRes[];

    const filteredVideos = videos.filter((video) => (video.latitude && video.longitude));

    return {
        props: {
            videos: filteredVideos || []
        }
    };
}) satisfies GetServerSideProps<{ videos: IVideosRes[] }>



export default World;