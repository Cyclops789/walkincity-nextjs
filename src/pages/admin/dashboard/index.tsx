import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { executeQueryReturnsJSON } from '@/lib/db';
import query from '@/utils/db';
import { IVideosRes } from './videos';
import { IUserReturns } from './users';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

interface IVideosRequests {
  id: number;
  vid: string;
  country: string;
  place: string;
  weather: string;
  continent: string;
  by_email: string;
  action: 'accept' | 'reject';
  verified: number;
}

const Notification = dynamic(import('@/components/Dashboard/Notification')),
  Layout = dynamic(import('@/components/Layouts/Dashboard')),
  Chart = dynamic(import('@/components/Dashboard/Chart'));

function dashboard({
  videos,
  unverified: unverifiedVideos,
  unverified: verifiedVideos,
  users, allUsers,
  admins,
  allRequests,
  unverifiedRequests,
  verifiedRequests,
  acceptedRequests,
  rejectedRequests,
  monthlyVideos,
  monthlyVideosRequests
}: {
  videos: number,
  unverified: number,
  verified: number,
  users: number,
  allUsers: number,
  admins: number,

  allRequests: number,
  unverifiedRequests: number,
  verifiedRequests: number,
  acceptedRequests: number,
  rejectedRequests: number,

  monthlyVideos: any[],
  monthlyVideosRequests: any[]
}) {
  const router = useRouter();
  const { error } = router.query;
  const [notify, setNotify] = useState<any>();
  const { user } = useUserStore();

  useEffect(() => {
    if (error && error === 'permission') {
      setNotify({ open: true, type: 'warning', text: 'You are not allowed to do this action!' });;
    }
  }, [error]);

  return (
    <Layout>
      {user && (
        <>
          <Notification
            setNotify={setNotify}
            open={notify?.open}
            type={notify?.type}
            text={notify?.text}
            duration={notify?.duration}
          />
          <div className='my-4 text-2xl text-center'>
            Hello, <span className='font-bold capitalize'>{user.username}</span>!
          </div>

          <div className={'flex space-x-2 mb-3 mt-5'}>
            <Link
              href={'/admin/dashboard/requests'}
              className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}
            >
              <div className="p-5 text-2xl">
                <div className='flex justify-between text-xl'>Total Requests <FontAwesomeIcon icon={faSignal} /></div>
                <div className='text-start text-2xl font-semibold mt-2'>{allRequests}</div>
                <div className="text-sm font-light flex justify-between"><span>Accepted: {acceptedRequests}</span> <span>Rejected: {rejectedRequests}</span></div>
              </div>
            </Link>

            <Link
              href={'/admin/dashboard/videos'}
              className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}
            >
              <div className="p-5 text-2xl">
                <div className='flex justify-between text-xl'>Total Videos <FontAwesomeIcon icon={faSignal} /></div>
                <div className='text-start text-2xl font-semibold mt-2'>{videos}</div>
                <div className="text-sm font-light flex justify-between"><span>Verified: {verifiedVideos}</span> <span>UnVerified: {unverifiedVideos}</span></div>
              </div>
            </Link>

            {(user.role.id || 3) <= 2 && (
              <Link
                href={'/admin/dashboard/users'}
                className={'w-full h-[130px] bg-[var(--primary-text-color)] rounded text-center items-center justify-center shadow'}
              >
                <div className="p-5 text-2xl">
                  <div className='flex justify-between text-xl'>Total Users <FontAwesomeIcon icon={faSignal} /></div>
                  <div className='text-start text-2xl font-semibold mt-2'>{allUsers}</div>
                  <div className="text-sm font-light flex justify-between"><span>Admins: {admins}</span> <span>Users: {users}</span></div>
                </div>
              </Link>
            )}
          </div>
          <div className={'flex space-x-2 mb-3'}>
            <div className='w-full bg-[var(--primary-text-color)] rounded text-white'>
              <Chart
                labelName='Videos'
                dataSet={monthlyVideos}
              />
            </div>
            <div className='w-full bg-[var(--primary-text-color)] rounded text-white'>
              <Chart
                labelName='Videos Requests'
                dataSet={monthlyVideosRequests}
              />
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

  const allRequests = await executeQueryReturnsJSON({
    query: query.getAllVideosRequests,
    values: []
  }) as IVideosRequests[];

  const monthlyVideos = await executeQueryReturnsJSON({
    query: query.getVideosOfThisMonth,
    values: []
  }) as any[];

  const monthlyVideosRequests = await executeQueryReturnsJSON({
    query: query.getVideosRequestsOfThisMonth,
    values: []
  }) as any[];

  const acceptedRequests = allRequests.filter((request) => request.action == 'accept');
  const rejectedRequests = allRequests.filter((request) => request.action == 'reject');

  return {
    props: {
      unverified: allVideos.filter((video) => video.verified === 0).length || 0,
      verified: allVideos.filter((video) => video.verified === 1).length || 0,
      videos: allVideos.length || 0,

      allUsers: allUsers.length || 0,
      admins: allUsers.filter((user) => parseInt(user.role as string) <= 2).length || 0,
      users: allUsers.filter((user) => parseInt(user.role as string) > 2).length || 0,

      allRequests: allRequests.length || 0,
      unverifiedRequests: allRequests.filter((request) => request.verified == 0).length || 0,
      verifiedRequests: allRequests.filter((request) => request.verified == 1).length || 0,
      acceptedRequests: acceptedRequests.length || 0,
      rejectedRequests: rejectedRequests.length || 0,

      monthlyVideos: monthlyVideos || [],
      monthlyVideosRequests: monthlyVideosRequests || []
    }
  }
}) satisfies GetServerSideProps<{
  videos: number,
  unverified: number,
  verified: number,

  allUsers: number,
  admins: number,
  users: number,

  allRequests: number,
  unverifiedRequests: number,
  verifiedRequests: number,
  acceptedRequests: number,
  rejectedRequests: number,

  monthlyVideos: any[],
  monthlyVideosRequests: any[]
}>

export default dashboard;