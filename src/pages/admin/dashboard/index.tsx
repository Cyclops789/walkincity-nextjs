import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { executeQueryReturnsJSON } from '@/lib/db';
import query from '@/utils/db';
import { IVideosRes } from './videos';
import { IUserReturns } from './users';
import { IUserWithoutPassword } from '@/components/Layouts/Dashboard';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Notification = dynamic(import('@/components/Dashboard/Notification')),
  Layout = dynamic(import('@/components/Layouts/Dashboard'));

function dashboard({ videos, users }: { videos: IVideosRes[], users: IUserReturns[] }) {
  const router = useRouter();
  const { error } = router.query;
  const [notify, setNotify] = useState<any>();
  const { data: session } = useSession();
  const [userSession, setUserSession] = useState<IUserWithoutPassword>();

  useEffect(() => {
    if (session) {
      //@ts-ignore this is valid
      setUserSession(session.user)
    }
  }, [session]);

  useEffect(() => {
    if (error && error === 'permission') {
      setNotify({ open: true, type: 'warning', text: 'You are not allowed to do this action!' });;
    }
  }, [error])

  return (
    <Layout>
      <Notification
        setNotify={setNotify}
        open={notify?.open}
        type={notify?.type}
        text={notify?.text}
        duration={notify?.duration}
      />
      <div className='my-4 text-2xl text-center'>
        Hello, <span className='font-bold capitalize'>{userSession?.username}</span>!
      </div>
      <div className='font-bold text-2xl mb-3'>Videos</div>
      <div className={'flex space-x-2'}>
        <div className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}>
          <div className="p-5 text-2xl">
            <div className='flex justify-between'>{videos.length} <FontAwesomeIcon icon={faSignal} /></div>
            <div className='text-start font-bold mt-5'>Total</div>
          </div>
        </div>

        <div className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}>
          <div className="p-5 text-2xl">
            <div className='flex justify-between'>{videos.filter((video) => video.verified === 0).length} <FontAwesomeIcon icon={faSignal} /></div>
            <div className='text-start font-bold mt-5'>Total unverified</div>
          </div>
        </div>

        <div className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}>
          <div className="p-5 text-2xl">
            <div className='flex justify-between'>{videos.filter((video) => video.verified === 1).length} <FontAwesomeIcon icon={faSignal} /></div>
            <div className='text-start font-bold mt-5'>Total verified</div>
          </div>
        </div>
      </div>
      {(userSession?.role?.id || 3) <= 2 && (
        <>
          <div className='font-bold text-2xl my-3'>Users</div>
          <div className={'flex space-x-2'}>
            <div className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}>
              <div className="p-5 text-2xl">
                <div className='flex justify-between'>{users.length} <FontAwesomeIcon icon={faSignal} /></div>
                <div className='text-start font-bold mt-5'>Total</div>
              </div>
            </div>

            <div className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}>
              <div className="p-5 text-2xl">
                <div className='flex justify-between'>{users.filter((user) => parseInt(user.role as string) > 2).length}  <FontAwesomeIcon icon={faSignal} /></div>
                <div className='text-start font-bold mt-5'>Total users</div>
              </div>
            </div>

            <div className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}>
              <div className="p-5 text-2xl">
                <div className='flex justify-between'>{users.filter((user) => parseInt(user.role as string) <= 2).length} <FontAwesomeIcon icon={faSignal} /></div>
                <div className='text-start font-bold mt-5'>Total admins</div>
              </div>
            </div>
          </div>
        </>
      )}

    </Layout>
  )
}

export const getServerSideProps = (async () => {
  const allVideos = await executeQueryReturnsJSON({
    query: query.getAllVideos,
    values: []
  }) as IVideosRes[];

  const allUsers = await executeQueryReturnsJSON({
    query: query.getAllUsers,
    values: []
  }) as IUserReturns[];

  return {
    props: {
      videos: allVideos,
      users: allUsers
    }
  }
}) satisfies GetServerSideProps<{ videos: IVideosRes[], users: IUserReturns[] }>

export default dashboard;