import Head from 'next/head'
import Link from 'next/link';
import { DashboardRoutes } from '@/helpers/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import sha256 from 'sha256';
import { faChartLine, faBell } from '@fortawesome/free-solid-svg-icons';

const UserProfile = dynamic(import('@/components/Dashboard/UserProfile')),
  NotificationArea = dynamic(import('@/components/Dashboard/NotificationArea'));

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

const ParentComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'p-3 h-auto'}>
      {children}
    </div>
  )
}

export default function Layout({
  children,
  title,
  className = ''
}: LayoutProps) {
  const { data: session, status: status } = useSession();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const wrapperRefNotification = useRef(null);
  const [open, setOpen] = useState(false);
  const [openNotifications, setNotificationOpen] = useState(false);
  const [getTitle, setTitle] = useState('Dashboard');
  const [userSession, setUserSession] = useState<IUserWithoutPassword>();
  const [sideBarOpen, setSideBarOpen] = useState<any>('1');
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
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (wrapperRefNotification.current && !wrapperRefNotification.current.contains(event.target)) {
        setNotificationOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRefNotification]);

  useEffect(() => {
    if (typeof title === 'string' && title) {
      setTitle(`Dashboard | ${title}`)
    } else {
      setTitle('Dashboard')
    }
  }, [title]);

  useEffect(() => {
    const sidebar = localStorage.getItem("sidebar");

    if (sidebar == "0") {
      setSideBarOpen("0")
    } else if (sidebar == "1") {
      setSideBarOpen("1")
    } else {
      setSideBarOpen("1")
    }
  }, []);

  useEffect(() => {
    if (sideBarOpen) {
      localStorage.setItem("sidebar", `${sideBarOpen}`);
    }
  }, [sideBarOpen])

  return (
    <div>
      <Head>
        <title>{getTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`flex h-screen w-screen text-white ${className}`}>
        {/* SideBar */}
        <section
          style={{
            backgroundColor: 'hsl(0, 0%, 22%)',
            transition: 'all 0.3s ease',
          }}
          className={`${sideBarOpen === "1" ? "w-[20%]" : "w-[70px]"}`}
        >
          <div style={{ backgroundColor: 'hsl(0, 0%, 15%)' }} className={'w-full h-[50px] text-center text-2xl items-center flex justify-center'}>
            <Image
              src={'/favicon.ico'}
              width={35}
              height={35}
              alt='Logo'
              className='mr-2'
            />
            {sideBarOpen === "1" && (
              <span className='font-semibold'>
                Walkin<strong className='text-[var(--primary-text-color)]'>.</strong>City
              </span>
            )}

          </div>
          <hr className='text-[var(--primary-text-color)]' style={{ borderTop: '2px dashed' }} />
          <div className='p-3 space-y-3'>
            <Link
              href={'/admin/dashboard'}
              key={'Dashboard'}
              className={`${'/admin/dashboard' === router.pathname ? "bg-[#1a1919]" : "bg-[#262626] hover:bg-[#1a1919]"} h-10 py-2 px-5 flex space-x-3  items-center rounded-lg ${sideBarOpen === "0" && "justify-center"}`}
            >
              <FontAwesomeIcon className='w-[20px]' icon={faChartLine} />
              {sideBarOpen === "1" && (
                <div>
                  Dashboard
                </div>
              )}
            </Link>
            {userPermissions && DashboardRoutes.map((route) => (
              /* @ts-ignore we dont need to convert number to string in order to use includes */
              userPermissions.includes(route.permissionID) && (
                <Link
                  href={route.path}
                  key={route.name}
                  className={`${router.pathname.startsWith(route.path) || route.path === router.pathname ? "bg-[#1a1919]" : "bg-[#262626] hover:bg-[#1a1919]"} h-10 py-2 px-5 flex space-x-3  items-center rounded-lg ${sideBarOpen === "0" && "justify-center"}`}
                >
                  <FontAwesomeIcon className='w-[20px]' icon={route.icon} />
                  {sideBarOpen === "1" && (
                    <div>
                      {route.name}
                    </div>
                  )}
                </Link>
              )
            ))}
          </div>
        </section>
        {/* Content */}

        <section style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className={`w-[100%] h-full overflow-auto`}>
          <div style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='w-full h-[50px] flex justify-between'>
            <div className={'flex justify-start'}>
              <div className={'px-2 py-1'}>
                <div
                  onClick={() => {
                    if (sideBarOpen === "1") {
                      setSideBarOpen("0")
                    } else if (sideBarOpen === "0") {
                      setSideBarOpen("1")
                    }
                  }}
                  className='cursor-pointer w-[40px] h-[40px] px-2 py-1 rounded flex items-center justify-center bg-[#d50c2d46] border border-[var(--primary-text-color)]'>
                  <FontAwesomeIcon
                    style={{
                      transition: 'all 0.5s ease',
                    }}
                    className={`text-[var(--primary-text-color)] ${sideBarOpen === "1" ? "" : "rotate-180"}`}
                    icon={faAnglesLeft}
                  />
                </div>
              </div>
            </div>

            <div className={'flex justify-end'}>
              <div
                onClick={() => setNotificationOpen(!openNotifications)}
                className='cursor-pointer mt-1 w-[40px] h-[40px] px-2 py-1 rounded flex items-center justify-center bg-[#d50c2d46] border border-[var(--primary-text-color)]'>
                <FontAwesomeIcon icon={faBell} className={`text-[var(--primary-text-color)]`} />
              </div>
              <div ref={wrapperRefNotification}>
                <NotificationArea open={openNotifications} />
              </div>

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
            <ParentComponent children={children} />
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

