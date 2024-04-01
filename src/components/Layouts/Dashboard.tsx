import Head from 'next/head'
import Link from 'next/link';
import { DashboardRoutes, GroupsRoutes } from '@/helpers/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useRef, useEffect, useState } from 'react';
import { faChartLine, faBell } from '@fortawesome/free-solid-svg-icons';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import { useNotificationsStore } from '@/store/notificationsStore';
import { INotification } from '@/store/notificationsStore';
import useClickOutside from '@/components/Dashboard/useClickOutside';

const UserProfile = dynamic(import('@/components/Dashboard/UserProfile')),
  NotificationArea = dynamic(import('@/components/Dashboard/NotificationArea'));

export interface IUserWithoutPassword {
  id: number;
  username: string;
  email: string;
  image: string;
  created_at: string;
  role: {
    id: number;
    name: string;
    permissions: string;
  };
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
  const router = useRouter();
  const userRef = useRef(null);
  const userButtonRef = useRef(null);

  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [openNotifications, setNotificationOpen] = useState(false);

  const [getTitle, setTitle] = useState('Dashboard');
  const [sideBarOpen, setSideBarOpen] = useState<any>('1');

  const { setUser, user: user } = useUserStore();
  const { notifications, markNotificationAsRead, setNotifications } = useNotificationsStore();

  useClickOutside(notificationRef, () => setNotificationOpen(false), notificationButtonRef);
  useClickOutside(userRef, () => setOpen(false), userButtonRef);

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
      setSideBarOpen("0");
    } else if (sidebar == "1") {
      if (window.innerWidth < 1314) {
        setSideBarOpen("0");
      } else if (window.innerWidth > 1314) {
        setSideBarOpen("1");
      } else {
        setSideBarOpen("1");
      }
    }
  }, []);

  useEffect(() => {
    if (sideBarOpen) {
      localStorage.setItem("sidebar", `${sideBarOpen}`);
    }
  }, [sideBarOpen]);

  // We are going to set the user state everytime the layout component renders
  // to prevent setting the state twice we are going to check if the user already set
  // WHY: at least we hide the routes before renewing the token...
  useEffect(() => {
    if (user === null) {
      (async () => {
        const res = await axios.get('/api/admin/account/state');
        const userResponse = res.data as IUserWithoutPassword;

        setUser({
          id: userResponse.id,
          username: userResponse.username,
          email: userResponse.email,
          created_at: userResponse.created_at || '',
          image: `/storage/uploads/profiles/${userResponse.image}`,
          role: {
            id: userResponse.role.id,
            name: userResponse.role.name,
            permissions: userResponse.role.permissions
          }
        });
      })();
    };
  }, [user]);

  // We are going to fetch the notifications on each request
  // better than opening a websocket?
  useEffect(() => {
    (async () => {
      if (notifications === null) {
        const res = await axios.get('/api/admin/account/notifications');
        const notificationsResponse = res.data.notifications as INotification[];
        setNotifications(notificationsResponse);
      }
    })();
  }, [notifications])

  return (
    <div>
      <Head>
        <title>{getTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user && (
        <div className={`flex h-screen w-screen text-white ${className}`}>
          {/* SideBar */}
          <section
            style={{
              transition: 'all 0.3s ease',
            }}
            className={`${sideBarOpen === "1" ? "w-[20%]" : "w-[70px]"} bg-[hsl(0,0%,22%)]`}
          >
            <Link href={'/'} className={'w-full h-[50px] text-center text-2xl items-center flex justify-center bg-[#262626] hover:bg-[#1d1d1d]'}>
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

            </Link>
            <hr className='text-[var(--primary-text-color)]' style={{ borderTop: '2px dashed' }} />
            <div className='p-3 space-y-3'>
              {sideBarOpen === "1" && (
                <div className={' font-semibold text-[var(--primary-text-color)]'}>Dashboard</div>
              )}
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
              {DashboardRoutes.map((route) => (
                (user.role.permissions.includes(String(route.permissionID)) || route.permissionID === null) && (
                  <>
                    {GroupsRoutes.map((group) => (((sideBarOpen === "1") && (group.before === route.permissionID)) && <div className={' font-semibold text-[var(--primary-text-color)]'}>{group.name}</div>))}
                    <Link
                      href={route.path}
                      key={route.name}
                      className={`border-l-[4px] ${router.pathname.startsWith(route.path) || route.path === router.pathname ? "bg-[#1a1919] border-[var(--primary-text-color)]" : "bg-[#262626] hover:bg-[#1a1919] border-transparent"} h-10 py-2 px-5 flex space-x-3  items-center rounded-lg ${sideBarOpen === "0" && "justify-center"}`}
                    >
                      <FontAwesomeIcon className='w-[20px]' icon={route.icon} />
                      {sideBarOpen === "1" && (
                        <div>
                          {route.name}
                        </div>
                      )}
                    </Link>
                  </>
                )
              ))}
            </div>
          </section>
          {/* Content */}

          <section className={`w-[100%] h-full overflow-auto bg-[hsl(0,0%,8%)]`}>
            <div className='w-full h-[50px] flex justify-between bg-[hsl(0,0%,22%)]'>
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
                      style={{ transition: 'all 0.5s ease' }}
                      className={`text-[var(--primary-text-color)] ${sideBarOpen === "1" ? "" : "rotate-180"}`}
                      icon={faAnglesLeft}
                    />
                  </div>
                </div>
              </div>

              <div className={'flex justify-end'}>
                <div
                  ref={notificationButtonRef}
                  onClick={() => setNotificationOpen(!openNotifications)}
                  className='notifications cursor-pointer mt-1 w-[40px] h-[40px] px-2 py-1 rounded flex items-center justify-center bg-[#d50c2d46] border border-[var(--primary-text-color)]'>
                  {notifications && notifications?.filter((notification) => notification.is_read == false)?.length > 0 && (
                    <div className='absolute text-[8px] font-bold text-center top-2 ml-3 bg-black rounded-full w-3 h-3'>
                      {notifications?.filter((notification) => notification.is_read == false).length || 0}
                    </div>
                  )}
                  <FontAwesomeIcon icon={faBell} className={`text-[var(--primary-text-color)]`} />
                </div>
                <div className={'relative'} ref={notificationRef}>
                  <NotificationArea markNotificationAsRead={markNotificationAsRead} notifications={notifications} open={openNotifications} />
                </div>

                <div 
                  ref={userButtonRef} 
                  onClick={() => setOpen(!open)} 
                  className={'border border-[var(--primary-text-color)] rounded flex justify-center h-[40px] overflow-hidden mx-2 mt-1 cursor-pointer'}
                >
                  <div>
                    <Image
                      className='mr-1'
                      height={40}
                      width={40}
                      alt={'User picture'}
                      src={user.image as string}
                    />
                  </div>

                  <div className={'items-center mr-1'}>
                    <div className={'text-start text-[12px]'}>
                      <div className={'text-blue-500 capitalize'}>
                        {user?.username}
                      </div>
                      <div className=''>
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={'relative'} ref={userRef} >
                  <UserProfile user={user} open={open} />
                </div>
              </div>
            </div>
            <ParentComponent children={children} />
          </section>
        </div>
      )}
    </div>
  )
}

