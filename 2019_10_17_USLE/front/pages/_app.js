import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Router from'next/router';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import AppLayout from '../layout/AppLayout';
import AdminLayout from '../layout/AdminLayout';
import theme from '../theme/theme';
import axios from 'axios';
import { LOAD_USER_REQUEST } from '../reducers/userReducer';

const Usle = ({ Component, store, pageProps }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles){
            jssStyles.parentNode.removeChild(jssStyles);
        }

        if(Router.route.match(/\/[a-z]+\//gi) && Router.route.match(/\/[a-z]+\//gi)[0] === '/admin/'){
            setIsAdmin(true);
        }
    }, []);
    
    
    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <StylesProvider injectFirst>

                        <CookiesProvider>
                            <Helmet
                                title="Usle"
                                htmlAttributes={{ lang: 'ko' }}
                                meta={[{
                                    charset: 'UTF-8',
                                },{
                                    name: 'viewport',
                                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                                  }, {
                                    'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
                                  }, {
                                    name: 'description', content: 'Usle 웹페이지',
                                  }, {
                                    name: 'og:title', content: 'Usle',
                                  }, {
                                    name: 'og:description', content: 'Usle 웹페이지',
                                  }, {
                                    property: 'og:type', content: 'website',
                                  }, {
                                    property: 'og:image', content: '',
                                  }]}
                                  link={[{
                                      rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"
                                  }, {
                                      rel: 'stylesheet', href: "/image-gallery/css/image-gallery-no-icon.css"
                                  }, {
                                      rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                                  }]}
                                 
                            />
                           
                            {!isAdmin ? 
                                <AppLayout> 
                                    <Component {...pageProps}/>
                                </AppLayout>
                            : 
                                <AdminLayout>
                                    <Component {...pageProps}/>
                                </AdminLayout>
                            }

                        </CookiesProvider>
                    
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
    
    let pageProps = {};
    let pageUrl = '';
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    
    // 서버사이드렌더링일 때는 쿠키를 직접 넣어줘야한다.
    if(ctx.isServer && cookie) {
        axios.defaults.headers.Cookie = '';
        axios.defaults.headers.Cookie = cookie;
    }
    if(!state.userReducer.me) {
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST
        });
    }

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
            next(action);
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

