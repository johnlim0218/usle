import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Container from '@material-ui/core/Container';

export const backgroundImage =
  'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

  const styles = theme => ({
    root: {
      color: theme.palette.common.white,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    rootsm: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
    },
    container: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(14),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.5,
      zIndex: -1,
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: -2,
    },
    arrowDown: {
      position: 'absolute',
      bottom: theme.spacing(4),
    },
  });

const StyledSection = styled.section`
   &&{
    ${({ theme }) => {
       const classes = styles(theme);
       return{
           ...classes.root,
       }
    }};
    ${breakpoint('sm')`
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.rootsm,
            }
        }}
    `};
    }
`;
const StyledContainer = styled(Container)`
    ${({ theme }) => {
        const classes = styles(theme);
        return{
            ...classes.container,
        }
    }}
`;
const StyledBackdrop = styled.div`
    ${({ theme }) => {
        const classes = styles(theme);
        return{
            ...classes.backdrop,
        }
    }}
`;
const Background = styled.div`
    ${({ theme }) => {
        const classes = styles(theme);
        return{
            ...classes.background,
        }
    }}
`
const StyledBackground = styled(Background)`
    background-image: url(${backgroundImage});
    background-color: #7fc7d9;
    background-position: center;
`;
const StyledSpaceImage = styled.img`
    width: 147px;
    height: 80px;
`;
const StyledArrowDownImage = styled.img`
    ${({ theme }) => {
        const classes = styles(theme);
        return{
            ...classes.arrowDown,
        }
    }}
`;

const IndexImageLayout = ({ children }) => {
    return(
        <StyledSection>
            <StyledContainer>
                <StyledSpaceImage src="https://material-ui.com/static/themes/onepirate/productHeroWonder.png"/>
                     {children}
                <StyledBackdrop/>
                <StyledBackground/>
                <StyledArrowDownImage src="https://material-ui.com/static/themes/onepirate/productHeroArrowDown.png"/>
            </StyledContainer>
        </StyledSection>
    )
}

IndexImageLayout.propTypes = {
    children: PropTypes.node.isRequires,
}

export default IndexImageLayout;