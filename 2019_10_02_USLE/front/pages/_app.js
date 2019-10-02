import React from 'react';
import Head from 'next/head';
import AppLayout from '../layout/AppLayout';

const Usle = ({ Component }) => {
    return (
        <>
            <Head>
                <title>Usle</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout> 
                <Component/>
            </AppLayout>
        </>
    )
} 
export default Usle;

