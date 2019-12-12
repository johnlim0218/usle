import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const ModifiedGrid = styled(Grid).attrs(props => ({
    container:true,
}))`
    margin-right: -15px;
    margin-left: -15px;
    width: auto;
    
    ${props => props.checkout &&`
        margin-right: 0;
        margin-left: 0;   
    `}
    ${props => props.myAccount &&`
        margin-right: 0;
        margin-left: 0;   
    `}
    ${props => props.signUp &&`
        margin-right: 0;
        margin-left: 0;   
    `}
`

const GridContainer = (props) => {
    const { children, checkout, signUp, ...others } = props;
    return(
        <ModifiedGrid {...props}>
            {children}
        </ModifiedGrid>
    )

}

GridContainer.propTypes = {
    children: PropTypes.node,
    checkout: PropTypes.bool,
    signUp: PropTypes.bool,
};

export default GridContainer;