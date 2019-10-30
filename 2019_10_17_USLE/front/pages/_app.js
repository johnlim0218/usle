import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router from'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import AppLayout from '../layout/AppLayout';
import AdminLayout from '../layout/AdminLayout';
import theme from '../theme/theme';

const Usle = ({ Component, store, pageProps }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles){
            jssStyles.parentNode.removeChild(jssStyles);
        }
        if(Router.route === '/admin/admin'){
            setIsAdmin(true);
        }
    }, []);
    
    
    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <StylesProvider injectFirst>
                        
                        <Head>
                            <title>Usle</title>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                            <link rel="stylesheet" href="css/image-gallery-no-icon.css"/>
                        </Head>
                        {!isAdmin ? 
                            <AppLayout> 
                                <Component {...pageProps}/>
                            </AppLayout>
                        : 
                            <AdminLayout>
                                 <Component {...pageProps}/>
                            </AdminLayout>
                        }
                    
                    </StylesProvider>
                </ThemeProvider>
            </Provider>
        </>
    )
} 

Usle.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
}

Usle.getInitialProps = async (context) => {
    const { ctx, Component, router } = context;
    console.log(context.router.route);
    let pageProps = {};
    let pageUrl = '';
    if(Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx) || {};
        
    }

    return { pageProps };
}

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware,
        // 로깅 미들웨어
        (store) => (next) => (action) => {
            console.log(action);
            next(action)
        }
    ];

    // REDUX_DEVTOOLS 사용
    const enhancer = 
        // 배포 단계
        process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            //개발 단계
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' 
            ? window.__REDUX_DEVTOOLS_EXTENSION__() 
            : (f) => f,  
    );
    const store = createStore(rootReducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(withReduxSaga(Usle));

