import React, { useEffect } from 'react';
import Head from 'next/head';
import AppLayout from '../layout/AppLayout';

const Usle = ({ Component, pageProps }) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles){
            jssStyles.parentNode.removeChild(jssStyles);
        }
    });

    return (
        <>
            <Head>
                <title>Usle</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout> 
                <Component {...pageProps}/>
            </AppLayout>
        </>
    )
} 

Usle.getInitialProps = async (context) => {
    const { ctx, Component } = context;

    let pageProps = {};

    if(Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx) || {};
    }

    return { pageProps };
}
export default Usle;

