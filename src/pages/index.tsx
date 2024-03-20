import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { IVideosRes, ICountryRes } from '@/components/SideBar';
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import query from '@/utils/db';
import { useRouter } from 'next/router';
import { executeQueryReturnsJSON } from '@/lib/db';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { INotificationType } from '@/components/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faPlus, faX, faEye } from '@fortawesome/free-solid-svg-icons';
import useClickOutside from '@/components/Dashboard/useClickOutside';

const Reactions = dynamic(import('@/components/Reactions'));
const Layout = dynamic(import('@/components/Layouts/Main'));
const Video = dynamic(import('@/components/Video'));
const SideBar = dynamic(import('@/components/SideBar'));
const PlayerButtons = dynamic(import('@/components/PlayerButtons'));
const Notification = dynamic(import('@/components/Notification'));

export default function WatchPage({ countries }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const handleFullScreen = useFullScreenHandle();
  const router = useRouter();
  const { query } = router;
  const v = query.v as number | undefined;
  const c = query.c as number | undefined;
  const cn = query.cn as string | undefined;
  const [currentVideo, setCurrentVideo] = useState<IVideosRes>();
  const [currentCountry, setCurrentCountry] = useState<ICountryRes>();
  const [reactionsShow, setReactionsShow] = useState(false);
  const [viewersShow, setViewersShow] = useState(false);
  const [connectors, setConnectors] = useState('0');
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState('Some, Where');
  const [ended, setEnded] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const actionRef = useRef(null);
  const actionButtonRef = useRef(null);
  const [volume, setVolume] = useState('0');
  const [notify, setNotify] = useState<INotificationType>({
    open: false,
    type: 'info',
    text: 'Simple'
  });

  useClickOutside(actionRef, () => setActionOpen(false), actionButtonRef);

  return (
    <FullScreen handle={handleFullScreen}>
      <Layout title={"Walk in | " + title}>
        {actionOpen && (
          <div>
            <div className={'fixed flex w-screen h-screen justify-center items-center overflow-auto text-white z-[999] bg-black/60'}>
              <div ref={actionRef} style={{ backgroundColor: 'hsl(0, 0%, 32.5%)' }} className={'w-[500px] h-auto rounded z-[9999]'}>
                <div className={'p-3 text-center'}>
                  <div className={'flex justify-end'}>
                    <div onClick={() => setActionOpen(false)} className={'hover:bg-white/20 rounded cursor-pointer mb-3'}>
                      <FontAwesomeIcon className={'px-2 py-1 mt-1'} icon={faX} />
                    </div>
                  </div>
                  <div className={'flex space-x-2'}>
                    <button onClick={() => router.push({ pathname: '/report', query: { 'type': 'website' } })} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                      <FontAwesomeIcon className={'w-[20px]'} icon={faBug} /> Report a website bug
                    </button>
                    <button onClick={() => router.push({ pathname: '/report', query: { 'type': 'video', 'v': currentVideo?.vid } })} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                      <FontAwesomeIcon className={'w-[20px]'} icon={faBug} /> Report a video bug
                    </button>
                  </div>
                  
                  <div className={'mt-3 flex space-x-2'}>
                    <button onClick={() => router.push('/request')} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                      <FontAwesomeIcon className={'w-[20px]'} icon={faPlus} /> Request a video
                    </button>
                    <button disabled className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                      <FontAwesomeIcon className={'w-[20px]'} icon={faPlus} /> Request an account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex">
          <SideBar
            ended={ended}
            setEnded={setEnded}
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
            currentVideo={currentVideo}
            setCurrentVideo={setCurrentVideo}
            countries={countries}
          />

          <Video
            v={v}
            c={c}
            cn={cn}
            volume={volume}
            countries={countries}
            ended={ended}
            setEnded={setEnded}
            setCurrentCountry={setCurrentCountry}
            currentCountry={currentCountry}
            setCurrentVideo={setCurrentVideo}
            currentVideo={currentVideo}
            setTitle={setTitle}
            setPlaying={setPlaying}
            playing={playing}
          />

          <PlayerButtons
            ended={ended}
            volume={volume}
            actionButtonRef={actionButtonRef}
            reactionsShow={reactionsShow}
            setReactionsShow={setReactionsShow}
            viewersShow={viewersShow}
            setViewersShow={setViewersShow}
            setEnded={setEnded}
            setActionOpen={setActionOpen}
            setVolume={setVolume}
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
            setCurrentVideo={setCurrentVideo}
            currentVideo={currentVideo}
            setNotify={setNotify}
            handleFullScreen={handleFullScreen}
          />

          {reactionsShow && (
            <Reactions
              connectors={connectors}
              setConnectors={setConnectors}
              video={currentVideo}
            />
          )}

          {viewersShow && (
            <div
              className={`fixed bottom-4 w-full flex justify-start ml-3 sm:justify-center sm:ml-0 z-[1]`}
            >
              <div className='flex h-9 rounded-full items-center space-x-2 w-[60px] text-white border border-white justify-center'>
                <FontAwesomeIcon className='w-[20px]' icon={faEye} />
                <div className='text-sm'>
                  {connectors}
                </div>
              </div>
            </div>
          )}

          <Notification
            setNotify={setNotify}
            open={notify.open}
            type={notify.type}
            text={notify.text}
            duration={notify.duration}
          />
        </div>
      </Layout>
    </FullScreen>
  )
}

export const getServerSideProps = (async () => {
  const videos = await executeQueryReturnsJSON({
    query: query.getAllVerifiedVideosForProduction,
    values: [],
  });

  const countries = await executeQueryReturnsJSON({
    query: query.getAllCountries,
    values: [],
  });

  const updatedCountries: ICountryRes[] = countries.map((country: ICountryRes) => {
    const updatedCountry = { ...country, videos: [] as IVideosRes[] };

    videos.forEach((video: IVideosRes) => {
      if (updatedCountry.long_name.toLowerCase() === video.country.toLowerCase()) {
        updatedCountry.videos.push(video);
      }
    });
    return updatedCountry;
  });

  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    newArray.sort(() => Math.random() - 0.5);

    return newArray;
  };

  return {
    props: {
      countries: shuffleArray(updatedCountries)
    }
  }
}) satisfies GetServerSideProps<{ countries: ICountryRes[] }>
