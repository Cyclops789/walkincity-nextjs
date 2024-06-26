import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { IVideosRes, ICountryRes } from '@/components/SideBar';
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import query from '@/utils/db';
import { useRouter } from 'next/router';
import { executeQueryReturnsJSON } from '@/lib/db';
import useClickOutside from '@/components/Dashboard/useClickOutside';

const Reactions = dynamic(import('@/components/Reactions'));
const Layout = dynamic(import('@/components/Layouts/Main'));
const Video = dynamic(import('@/components/Video'));
const SideBar = dynamic(import('@/components/SideBar'));
const PlayerButtons = dynamic(import('@/components/PlayerButtons'));
const Viewers = dynamic(import('@/components/Viewers'));
const Info = dynamic(import('@/components/Info'));

export default function WatchPage({ countries }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { query } = router;
  // Video queries
  const v = query.v as number | undefined;
  const c = query.c as number | undefined;
  const cn = query.cn as string | undefined;

  // Video Data
  const [currentVideo, setCurrentVideo] = useState<IVideosRes>();
  const [currentCountry, setCurrentCountry] = useState<ICountryRes>();

  // User Pres
  const [reactionsShow, setReactionsShow] = useState(false);
  const [viewersShow, setViewersShow] = useState(false);
  const [playLastPlaylist, setPlayLastPlaylist] = useState(false);

  // General states
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [connectors, setConnectors] = useState('0');
  const [playerVolume, setPlayerVolume] = useState('');
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [volume, setVolume] = useState('0');
  const [actionOpen, setActionOpen] = useState(false);

  // Page state
  const [title, setTitle] = useState('Some, Where');

  const actionRef = useRef(null);
  const actionButtonRef = useRef(null);

  useClickOutside(actionRef, () => setActionOpen(false), actionButtonRef);

  return (
    <Layout title={"Walk in | " + title}>
      {actionOpen && (
        <Info actionRef={actionRef} setActionOpen={setActionOpen} vid={currentVideo?.vid} />
      )}
      <SideBar
        v={v}
        cn={cn}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
        ended={ended}
        setEnded={setEnded}
        currentCountry={currentCountry}
        setCurrentCountry={setCurrentCountry}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
        countries={countries}
        setPlaying={setPlaying}
        playing={playing}
      />

      <Video
        v={v}
        c={c}
        cn={cn}
        playerVolume={playerVolume}
        setPlayerVolume={setPlayerVolume}
        volume={volume}
        countries={countries}
        ended={ended}
        sideBarOpen={sideBarOpen}
        setSideBarOpen={setSideBarOpen}
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
        playLastPlaylist={playLastPlaylist}
        setPlayLastPlaylist={setPlayLastPlaylist}
      />

      {reactionsShow && (
        <Reactions
          connectors={connectors}
          setConnectors={setConnectors}
          video={currentVideo}
        />
      )}

      {viewersShow && (
        <Viewers currentVideo={currentVideo} currentCountry={currentCountry} ended={ended} connectors={connectors} />
      )}
    </Layout>
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
