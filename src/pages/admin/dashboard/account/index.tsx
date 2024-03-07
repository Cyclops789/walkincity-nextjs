import React from 'react'
import dynamic from 'next/dynamic';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));
function account() {
    return (
        <Layout title={'Account'}>
            <div className='flex space-x-3'>
                <div style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={`rounded-lg h-[900px] w-full`}>

                </div>
                <div style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={`rounded-lg h-[900px] w-full`}>

                </div>
            </div>
        </Layout>
    )
}

export default account;