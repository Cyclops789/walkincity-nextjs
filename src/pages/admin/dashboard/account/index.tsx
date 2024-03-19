import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useUserStore } from '@/store/userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import axios from 'axios';
import { refreshRouteSilenced } from '@/helpers/routes';
import { useRouter } from 'next/router';
import { INotificationType } from '@/components/Notification';

interface IUserProfileForm {
    password?: string;
    confirmationPassword?: string;
}

const Layout = dynamic(import('@/components/Layouts/Dashboard')), Notification = dynamic(import('@/components/Dashboard/Notification'));

function account() {
    const router = useRouter();
    const { user, modifyUser } = useUserStore();
    const [pfp, setPfp] = useState<File>();
    const [selectedImage, setSelectedImage] = useState("");
    const [form, setForm] = useState<IUserProfileForm>();
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const changeUserPfp = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && (e.target.files?.length || 0) >= 1) {
            let image = e.target.files[0];
            setPfp(image)
            setSelectedImage(URL.createObjectURL(image));
        }
    };

    const convertUserDate = (dateString: string) => {
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const day = ('0' + date.getDate()).slice(-2);
        const year = date.getFullYear();

        return month + ' ' + day + ', ' + year;
    };

    const saveUserProfile = async () => {
        if (pfp) {
            try {
                const formData = new FormData();
                formData.append('image', pfp as any);

                axios.post('/api/admin/account/change-picture', formData).then((res) => {
                    if(res.data.success) {
                        setPfp(undefined);
                        modifyUser({ image: selectedImage })
                        refreshRouteSilenced(router);
                        setNotify({ open: true, type: 'success', text: res.data.message });
                    } else {
                        setNotify({ open: true, type: 'warning', text: res.data.error.message });
                    }
                });
            } catch (e: any) {
                console.error(e)
            }
        }

        if (form && form.password && form.confirmationPassword) {
            if (form.password != form.confirmationPassword) {
                return setNotify({ open: true, type: 'warning', text: "Password doesn't match the confirmation password." });
            }

            axios.post('/api/admin/account/update-password', {
                password: form.password,
                confirmationPassword: form.confirmationPassword
            }).then((res) => {
                if(res.data.success) {
                    setNotify({ open: true, type: 'success', text: res.data.message });
                } else {
                    setNotify({ open: true, type: 'warning', text: res.data.error.message });
                }
            })
        }
    };

    return (
        <Layout title={'Account'}>
            <Notification
                setNotify={setNotify}
                open={notify.open}
                type={notify.type}
                text={notify.text}
                duration={notify.duration}
            />
            <div className="flex space-x-3">
                <div style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={`rounded-lg h-full w-full`}>
                    <div className={'flex justify-center mt-5'}>
                        <label
                            htmlFor={'uploadImage'}
                            className={'relative text-black rounded-full flex justify-center items-center bg-black w-[150px] h-[150px] cursor-pointer border-2 hover:border border-black overflow-hidden'}
                        >
                            <Image
                                src={selectedImage ? selectedImage : user?.image as string}
                                alt='User Image'
                                width={150}
                                height={150}
                            />
                            <FontAwesomeIcon className='absolute' icon={faCloudArrowUp} size='2xl' />
                        </label>
                        <input hidden id={"uploadImage"} onChange={changeUserPfp} type={"file"} accept={'image/*'} />
                    </div>
                    <div className={'flex flex-col space-x-3'}>
                        <div className='text-[30px] font-semibold text-center capitalize'>
                            {user?.username} - <span className='text-[var(--primary-text-color)]'>{user?.role.name}</span>
                        </div>
                        <div className='text-center'>
                            Your account was created at <span className='text-[var(--primary-text-color)] capitalize'>{`${user && convertUserDate(user.created_at)}`}</span>
                        </div>
                    </div>
                    <div className={'space-y-3 mt-4 px-8'}>
                        <div className={'text-xl font-semibold text-[var(--primary-text-color)]'}>Account</div>
                        <div className={'flex justify-between space-x-3'}>
                            <div className='space-y-2 flex flex-col w-full'>
                                <label htmlFor='username'>Username</label>
                                <input disabled id='username' className='rounded p-2 bg-[#262626] text-white w-full ' value={user?.username} />
                            </div>
                            <div className='space-y-2 flex flex-col w-full'>
                                <label htmlFor='username'>Email</label>
                                <input disabled id='username' className='rounded p-2 bg-[#262626] text-white w-full ' value={user?.email} />
                            </div>
                        </div>

                        <div className={'text-xl font-semibold text-[var(--primary-text-color)]'}>Change your password</div>
                        <div className={'flex justify-between space-x-3'}>
                            <div className='space-y-2 flex flex-col w-full'>
                                <label htmlFor='password'>Password</label>
                                <input onChange={(e) => setForm({ confirmationPassword: form?.confirmationPassword, password: e.target.value })} type='password' id='password' className='rounded p-2 bg-[#262626] text-white w-full ' />
                            </div>
                            <div className='space-y-2 flex flex-col w-full'>
                                <label htmlFor='password2'>Confirm password</label>
                                <input onChange={(e) => setForm({ password: form?.password, confirmationPassword: e.target.value })} type='password' id='password2' className='rounded p-2 bg-[#262626] text-white w-full ' />
                            </div>
                        </div>

                        <div className='flex justify-center pt-2 pb-5'>
                            <button onClick={saveUserProfile} className='bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default account;
