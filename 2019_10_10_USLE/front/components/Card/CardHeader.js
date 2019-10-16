import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledCardHeader = styled.div`
    border-radius: 3px;
    padding: 1rem 15px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: -30px;
    border: 0;
    margin-bottom: 0;

   ${props => props.image && `
        position: relative;
            padding: 0;
            z-index: 1;
            margin-left: 15px;
            margin-right: 15px;
            margin-top: -30px;
            border-radius: 6px;
            & img {
                width: 100%;
                border-radius: 6px;
                pointer-events: none;
                box-shadow: 
                    0 5px 15px -8px rgba(0, 0, 0, 0.24), 
                    0 8px 10px -5px rgba(0, 0, 0, 0.2);
            },
            & a {
                display: block;
            }   
    `}
`;

const CardHeader = (props) => {
    return(
        <StyledCardHeader {...props}>
            {props.children}
        </StyledCardHeader>
    )
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  noShadow: PropTypes.bool,
  children: PropTypes.node
};
export default CardHeader;