import React from 'react';
import IndexImage from '../views/IndexImage';
import IndexValues from '../views/IndexValues';
import IndexCategories from '../views/IndexCategories';
import IndexHowItWorks from '../views/IndexHowItWorks';
import IndexQuestion from '../views/IndexQuestion';
import ModifiedButton from '../components/Button';

const Home = ({ props }) => {
    
    return (
        <>
            <IndexImage/>            
            <IndexValues/>
            <IndexCategories/>
            <IndexHowItWorks/>
            <IndexQuestion/>
        </>
    );
}

export default Home;