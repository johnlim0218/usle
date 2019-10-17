import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDivCardFooter = styled.div`
    display: flex;
    align-items: center;
    background-color: transparent;
    padding: 0.9375rem 1.875rem;
    padding-top: 0;
`;

const CardFooter = (props) => {
    return(
        <StyledDivCardFooter {...props}>
            {props.children}
        </StyledDivCardFooter>
    )
}

CardFooter.propTypes = {
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    pricing: PropTypes.bool,
    testimonial: PropTypes.bool,
    children: PropTypes.node
  };
export default CardFooter;