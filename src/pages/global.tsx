import { useState, useEffect, useRef, forwardRef } from "react";
import dynamic from "next/dynamic";
import type { GetServerSideProps } from 'next'
import { IVideosRes } from '@/components/SideBar';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import randomcolor from 'randomcolor';
import { useRouter } from "next/router";
import Link from 'next/link';

const Loading = () => {
    return (
        <div className='w-screen h-screen bg-black text-white justify-center items-center flex fixed text-xl z-[99999]'>
            <div className={"dot-loader"}></div>
        </div>
    )
}

const GlobeController = dynamic(import("@/components/GlobeController"));
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path fill="currentColor" d="M160 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM126.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L281 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L247 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM68.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L68.7 398z"/>
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

    const clickZoom = (value: number, zoomType: "zoomIn" | "zoomOut") => {
        if (value >= 20 && zoomType === "zoomIn") {
            return value - 5;
        } else if (value <= 75 && zoomType === "zoomOut") {
            return value + 5;
        } else {
            return value;
        }
    };

    const zoomModel = (zoomType: "zoomIn" | "zoomOut") => {
        const value = Math.floor(
            (2 *
                Math.atan((globeRef.current as any).camera().getFilmHeight() / 2 / (globeRef.current as any).camera().getFocalLength()) *
                180) /
            Math.PI
        );
        (globeRef.current as any).camera().fov = clickZoom(value, zoomType);
        (globeRef.current as any).camera().updateProjectionMatrix();
    }


    return (
        <>
            <GlobeController zoomModel={zoomModel} />
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