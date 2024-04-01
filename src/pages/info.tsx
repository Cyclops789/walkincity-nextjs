import React from 'react'
import dynamic from 'next/dynamic';

const Layout = dynamic(import('@/components/Layouts/Main'));

function info() {
    return (
        <Layout title={'WalkIn City | Info'}>
            <div className={'h-screen w-screen bg-black sm:flex justify-center items-center space-y-3 sm:space-y-0 sm:space-x-3 overflow-auto'}>

                <div className={'bg-white w-[278px] h-[278px] rounded-lg'}>
                    <div className={'p-3'}>
                        Test
                    </div>
                </div>

                <div className={'bg-white w-[278px] h-[278px] rounded-lg'}>
                    <div className={'p-3'}>
                        Test
                    </div>
                </div>

                <div className={'bg-white w-[278px] h-[278px] rounded-lg'}>
                    <div className={'p-3'}>
                        Test
                    </div>
                </div>

            </div>
        </Layout>
    )
};

export default info;