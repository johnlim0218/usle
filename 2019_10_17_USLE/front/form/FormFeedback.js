import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '../components/Typography';


const FormFeedback = (props) => {
    const { children } = props;
    
    return(
        <div>
            {children}
        </div>
    )
}
FormFeedback.propTypes = {
    children: PropTypes.node,
}

export default FormFeedback;