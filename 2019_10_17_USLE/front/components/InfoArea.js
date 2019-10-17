import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

import Typography from './Typography';

const StyledDivInfoAreaRoot = styled.div`
    max-width: 360px;
    margin: 0 auto;
    padding: 70px 0 30px;
`;
const StyledDivIconWrapperNoneFloat = styled.div`
    float: none;
    margin-top: 24px;
    margin-right: 10px;
`;
const StyledDivIconWrapperFloat = styled.div`
    float: left;
    margin-top: 24px;
    margin-right: 10px;
`;
const StyledIconText = styled(Icon)`
    width: 61px; 
    height: 61px;
`;
const StyledTypographyTitle = styled(Typography)`
    text-decoration: none;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 25px;
    min-height: 32px;
`;
const StyledDivDescriptionWrapper = styled.div`
    color: gray;
    overflow: hidden;
`;
const StyledTypographyDescription = styled(Typography)`
    overflow: hidden;
    margin-top: 10px;
    
`;


const InfoArea = (props) => {
    const { title, description, iconColor, vertical } = props;

    return (
        <StyledDivInfoAreaRoot>
            {vertical  
                ?  <StyledDivIconWrapperNoneFloat>
                        {typeof props.icon === "string" 
                            ? <StyledIconText>{props.icon}</StyledIconText> 
                            : <props.icon style={{ width:'61px', height:'61px'}}/>
                        }
                   </StyledDivIconWrapperNoneFloat>
                :  <StyledDivIconWrapperFloat>
                        {typeof props.icon === "string" 
                            ? <StyledIconText>{props.icon}</StyledIconText> 
                            : <props.icon style={{ width:'61px', height:'61px'}}/>
                        }
                    </StyledDivIconWrapperFloat>   
            
            }
            <StyledDivDescriptionWrapper>
                <StyledTypographyTitle variant='h5'>{title}</StyledTypographyTitle>
                <StyledTypographyDescription variant="body1">{description}</StyledTypographyDescription>
            </StyledDivDescriptionWrapper>
        </StyledDivInfoAreaRoot>
    )
};


InfoArea.propTypes = {
    icon : PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    iconColor: PropTypes.oneOf([
        "primary",
        "warning",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    vertical: PropTypes.bool,
};

export default InfoArea;