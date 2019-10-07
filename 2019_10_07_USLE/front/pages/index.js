import React from 'react';
import IndexImage from '../views/IndexImage';
import IndexValues from '../views/IndexValues';
import IndexCategories from '../views/IndexCategories';
import ModifiedButton from '../components/Button';
const Home = ({ props }) => {
    
    return (
        <>
            <IndexImage/>            
            <IndexValues/>
            <IndexCategories/>
        </>
    );
}

export default Home;