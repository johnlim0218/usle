import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Tooltip from '../components/Tooltip';
import Button from '../components/Button';
import { dummyImg } from '../dummy/dummy';

const StyledDivImgContainer = styled.div`
    width: 120px;
    max-height: 160px;
    overflow: hidden;
    display: block;
    & img {
        width: 100%;
    }
`;
const StyledTdNameSmall = styled.small`
    font-size: 0.75em;
    font-weight: 300;
`;
const StyledTdNumberSmall = styled.small`
    margin-right: 3px;
`;
const CartTableData = (props) => {
    return(
        <StyledDivImgContainer>
            <img src={dummyImg}/>
        </StyledDivImgContainer>,
        <span>
            <a href="#jacket">
                Spring Jacket
            </a>
            <br />
            <StyledTdNameSmall>
                by USLE
            </StyledTdNameSmall>
        </span>,
        "Red",
        "M",
        <span>
            <StyledTdNumberSmall>￦</StyledTdNumberSmall> 10,000
        </span>,
        <span>
            1{` `}
            <div>
                <Button>
                    <Remove/>
                </Button>
                <Button>
                    <Add/>
                </Button>
            </div>
        </span>,
        <span>
            <StyledTdNumberSmall>￦</StyledTdNumberSmall> 10,000
        </span>,
        <Tooltip
            id="close1"
            title="Remove item"
            placement="right"
        >
            <Button>
                <Close/>
            </Button>
        </Tooltip>
    )
}

CartTableData.propTypes = {

}

export default CartTableData;
