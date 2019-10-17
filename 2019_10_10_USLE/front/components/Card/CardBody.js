import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDivCardBody = styled.div`
    padding: 0.9375rem 1.875rem;
    flex: 1 1 auto;
    webkit-box-flex: 1;
`;
const CardBody = (props) => {
    return(
        <StyledDivCardBody {...props}>
            {props.children}
        </StyledDivCardBody>
    )
}
CardBody.propTypes = {
    background: PropTypes.bool,
    plain: PropTypes.bool,
    formHorizontal: PropTypes.bool,
    pricing: PropTypes.bool,
    signup: PropTypes.bool,
    color: PropTypes.bool,
    children: PropTypes.node
  };

export default CardBody;