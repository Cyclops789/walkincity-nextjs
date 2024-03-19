import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { IVideosRes, ICountryRes } from '@/components/SideBar';
import dynamic from "next/dynamic";
import { useState } from "react";
import query from '@/utils/db';
import { useRouter } from 'next/router';
import { executeQueryReturnsJSON } from '@/lib/db';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { INotificationType } from '@/components/Notification';

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
  const [playing, setPlaying] = useState(false);
  const [title, setTitle] = useState('Some, Where');
  const [ended, setEnded] = useState(false);
  const [volume, setVolume] = useState('0');
  const [notify, setNotify] = useState<INotificationType>({
    open: false,
    type: 'info',
    text: 'Simple'
  });

  return (
    <FullScreen handle={handleFullScreen}>
      <Layout title={"Walk in | " + title}>
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
            setEnded={setEnded}
            setVolume={setVolume}
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
            setCurrentVideo={setCurrentVideo}
            currentVideo={currentVideo}
            setNotify={setNotify}
            handleFullScreen={handleFullScreen}
          />

          <Reactions
            video={currentVideo}
          />

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
