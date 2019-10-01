import React from 'react';
import Head from 'next/head';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';
import AppLayout from '../layout/AppLayout';

const Usle = ({ Component, store }) => {
    return (
        <>
            <Head>
                <title>Usle</title>
            </Head>
        <AppLayout> 
            <Component/>
        </AppLayout>
        </>
    )
}

export default withReduxSaga(Usle);
