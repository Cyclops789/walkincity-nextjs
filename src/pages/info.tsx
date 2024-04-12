import React from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

const Layout = dynamic(import('@/components/Layouts/Main'));

function info() {
    const images = ['nextjs.png', 'reactjs.png', 'socketio.png', 'tailwindcss.png', 'threejs.png'];

    return (
        <Layout title={'WalkIn City | Info'}>
            <div className={'fixed h-screen w-screen text-black bg-black overflow-auto'}>
                <div className={`bg-white w-[calc(100vw-24px)] m-3 min-h-[calc((100vh-47px)/3)] rounded-lg`}>
                    <div className={'p-3'}>
                        <div className={'text-[40px] font-extrabold'}>Technologies</div>
                        <div className={'text-[20px] gap-2 flex justify-start items-center h-full w-full'}>
                            {images.map((image) => <Image className={'rounded-full'} height={0} src={`/info/${image}`} width={100} alt={image.replaceAll('.png', '')} />)}
                        </div>
                    </div>
                </div>
                    
                <div className={`bg-white w-[calc(100vw-24px)] m-3 min-h-[calc((100vh-47px)/3)] rounded-lg`}>
                    <div className={'p-3'}>
                        <div className={'text-[40px] font-extrabold'}>Disclaimer</div>
                        <div className={'text-[20px]'}>
                            The website will never display any advertisements, All advertisements comes from youtube, so you either have to block them with an ad blocker, or keep them to support the content creator.
                        </div>
                    </div>
                </div>
                    
                <div className={`bg-white w-[calc(100vw-24px)] m-3 min-h-[calc((100vh-47px)/3)] rounded-lg`}>
                    <div className={'p-3'}>
                        <div className={'text-[40px] font-extrabold'}>About Me</div>
                        <div className={'text-[20px]'}>
                            My name is <a target='_blank' className={'text-red-800'} href={`https://cyyc.lol`}>Hamza</a>, I'm a 20 year old developer-man from <Link className={'text-red-800'} href={`${process.env.NEXT_PUBLIC_APP_URL}/?cn=Morocco`}>Morocco</Link>, I code in <span className={'font-medium'}>React.js</span>, <span className={'font-medium'}>Vue.js</span>, <span className={'font-medium'}>Next.js</span>, <span className={'font-medium'}>Laravel</span>, and <span className={'font-medium'}>Tailwind CSS</span>, want to hire me? <span className={'font-bold'}>send me an email <a className={'text-red-800 font-medium'} href={`mailto:hire@cyyc.lol`}>hire@cyyc.lol</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default info;