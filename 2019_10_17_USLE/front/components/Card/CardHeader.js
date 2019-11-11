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
        
        & div {
            position: relative; 
            padding-top: 60%;
            overflow: hidden;
            
            & img {
                position: absolute;
                bottom: 0;
                left: 0;
                max-width: 100%;
                
                border-radius: 6px;
                pointer-events: none;
                
                box-shadow: 
                    0 5px 15px -8px rgba(0, 0, 0, 0.24), 
                    0 8px 10px -5px rgba(0, 0, 0, 0.2);
            }
            & a {
                display: block;
            }
        }
    `}

    ${props => props.plain && `
        margin-left: 0px;
        margin-right: 0px;
        &$cardHeaderImage {
          margin: 0 !important;
        }
    `}
`;

const CardHeader = (props) => {
    const { color, plain, image, contact, signup, noShadow, children, ...others } = props;
    return(
        <StyledCardHeader {...props}>
            <div>
                {children}
            </div>
        </StyledCardHeader>
    )
}

CardHeader.propTypes = {
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