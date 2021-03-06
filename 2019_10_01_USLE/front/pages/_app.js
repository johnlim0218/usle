import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

import AppLayout from '../layout/AppLayout';

const Usle = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>Usle</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
            </Head>
            <AppLayout> 
                <Component/>
            </AppLayout>
        </Provider>
    )
} 

export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(
      applyMiddleware(...middlewares),
      !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    return store;
  })(Usle);


