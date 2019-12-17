import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';

const MyError = (props) => {
    const { statusCode } = props;
    return(
        <div>
            <h1>{statusCode} 에러 발생</h1>
            <Error statusCode={statusCode} />
        </div>
    )
}

MyError.propTypes = {
    statusCode: PropTypes.number,
}

MyError.getInitialProps = async (context) => {
    const statusCode = context.res ? context.res.statusCode : context.err ? constext.err.statusCode : null ;
    return {statusCode};
}

export default MyError;