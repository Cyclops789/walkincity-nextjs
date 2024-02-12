import Head from 'next/head'
import Link from 'next/link';
import { DashboardRoutes } from '@/helpers/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import sha256 from 'sha256';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const UserProfile = dynamic(import('@/components/Dashboard/UserProfile'));

export interface IUserWithoutPassword {
  id: number;
  username: string;
  email: string;
  image: string;
  role?: {
    id?: number;
    name?: string;
    permissions?: string;
  };
  created_at: string;
}

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Layout({
  children,
  title,
  className = ''
}: LayoutProps) {
  const { data: session, status: status } = useSession();
  const [userSession, setUserSession] = useState<IUserWithoutPassword>();
  const [userPermissions, setUserPermissions] = useState('');

  useEffect(() => {
    if (session) {
      //@ts-ignore this is valid
      session.user.image = `https://gravatar.com/avatar/${sha256(session.user.email)}?s=50&d=identicon`;
      //@ts-ignore this is valid
      setUserSession(session.user);

      //@ts-ignore this is also valid
      setUserPermissions(JSON.parse(session.user.role.permissions))
    }
  }, [session]);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [getTitle, setTitle] = useState('Dashboard');

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

  useEffect(() => {
    if (typeof title === 'string' && title) {
      setTitle(`Dashboard | ${title}`)
    } else {
      setTitle('Dashboard')
    }
  }, [title])

  return (
    <div>
      <Head>
        <title>{getTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`flex h-screen w-screen text-white ${className}`}>
        {/* SideBar */}
        <section style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='w-[20%]'>
          <div style={{ backgroundColor: 'hsl(0, 0%, 15%)' }} className={'w-full h-[50px] text-center text-2xl items-center justify-center flex'}>
            Dashboard
          </div>
          <hr className='text-black' style={{ borderTop: '2px dashed' }} />
          <div className='p-3 space-y-3'>
            <Link
              href={'/admin/dashboard'}
              key={'Dashboard'}
              className={`${'/admin/dashboard' === router.pathname ? "bg-[#1a1919]" : "bg-[#262626] hover:bg-[#1a1919]"}  py-2 px-5 flex space-x-3  items-center rounded-lg`}
            >
              <FontAwesomeIcon className='w-[20px]' icon={faChartLine} />
              <div>
                Dashboard
              </div>
            </Link>
            {userPermissions && DashboardRoutes.map((route) => (
              /* @ts-ignore we dont need to convert number to string in order to use includes */
              userPermissions.includes(route.permissionID) && (
                <Link
                  href={route.path}
                  key={route.name}
                  className={`${router.pathname.startsWith(route.path) || route.path === router.pathname ? "bg-[#1a1919]" : "bg-[#262626] hover:bg-[#1a1919]"}  py-2 px-5 flex space-x-3  items-center rounded-lg`}
                >
                  <FontAwesomeIcon className='w-[20px]' icon={route.icon} />
                  <div>
                    {route.name}
                  </div>
                </Link>
              )
            ))}
          </div>
        </section>
        {/* Content */}

        <section style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className={`w-[80%] h-full overflow-auto`}>
          <div style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='w-full h-[50px] flex justify-between'>
            <div className={'flex justify-start'}>
              <div className={'px-2 py-1'}>
                <div className='cursor-pointer w-[40px] h-[40px] bg-slate-300 px-2 py-1 rounded flex items-center justify-center border border-slate-900'>
                  <FontAwesomeIcon className={'text-slate-900'} icon={faAnglesLeft} />
                </div>
              </div>
            </div>

            <div className={'flex justify-end'}>
              <div onClick={() => setOpen(!open)} className={'cursor-pointer px-2 py-1'}>
                <Image
                  className={'rounded border border-slate-900'}
                  height={40}
                  width={40}
                  alt={'User picture'}
                  src={userSession?.image as string}
                />
              </div>
              <div ref={wrapperRef}>
                {userSession && (
                  <UserProfile user={userSession} open={open} />
                )}
              </div>
            </div>
          </div>
          {userSession ? (
            <div className={'p-3 h-auto'}>
              {children}
            </div>
          ) : (
            <div className='w-full h-[calc(100%-50px)] flex justify-center items-center'>
              <div className="custom-loader"></div>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

