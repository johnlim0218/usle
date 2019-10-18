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

    ${props => props.left && `
        padding-right: 5px;
        padding-left: 0;
    `}

    ${props => props.right && `
        padding-right: 0;
        padding-left: 5px;
    `}
`

const GridItem = (props) => {
    const { children, right, left, ...others } = props;
    return(
        <ModifiedGrid {...props}>
            {children}
        </ModifiedGrid>
    )
}

GridItem.PropTypes = {
    children: PropTypes.node,
    left: PropTypes.bool,
    right: PropTypes.bool,
};

export default GridItem;