import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';


const StyledProduct = css`
    margin-top: 30px;
`

const StyledDivCard = styled.div.attrs((props) => {
    
    
})`
    border: 0;
    margin-bottom: 30px;
    margin-top: ${props => props.product && 30}px;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.87);
    background: whiteColor;
    width: 100%;
    box-shadow:
        0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    font-size: .875rem;
    @media all and (-ms-high-contrast: none) (-ms-high-contrast: active) {
        display: inline-block !important;
    }

`


const Card = (props) => {
    return (
        <StyledDivCard {...props}>
          {props.children}
        </StyledDivCard>
    )
}

Card.propTypes = {
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    blog: PropTypes.bool,
    raised: PropTypes.bool,
    background: PropTypes.bool,
    pricing: PropTypes.bool,
    testimonial: PropTypes.bool,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "rose"
    ]),
    product: PropTypes.bool,
    children: PropTypes.node
  };

export default Card;