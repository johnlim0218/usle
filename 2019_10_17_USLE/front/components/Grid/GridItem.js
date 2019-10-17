import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const ModifiedGrid = styled(Grid).attrs(props => ({
    item:true,
}))`
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
`

const GridItem = (props) => {
    const { children, ...others } = props;
    return(
        <ModifiedGrid {...others}>
            {children}
        </ModifiedGrid>
    )

}

GridItem.PropTypes = {
    children: PropTypes.node,
};

export default GridItem;