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
`

const GridContainer = (props) => {
    const { children, ...others } = props;
    return(
        <ModifiedGrid {...others}>
            {children}
        </ModifiedGrid>
    )

}

GridContainer.PropTypes = {
    children: PropTypes.node,
};

export default GridContainer;