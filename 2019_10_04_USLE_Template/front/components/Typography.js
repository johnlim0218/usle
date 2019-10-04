import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from '@material-ui/core/utils';
import MuiTypography from '@material-ui/core/Typography';

const styles = (theme) => ({
      markedH2Center: {
        height: 4,
        width: 73,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
      },
      markedH3Center: {
        height: 4,
        width: 55,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
      },
      markedH4Center: {
        height: 4,
        width: 55,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        backgroundColor: theme.palette.secondary.main,
      },
      markedH6Left: {
        height: 2,
        width: 28,
        display: 'block',
        marginTop: theme.spacing(0.5),
        background: 'currentColor',
      },
});

const StyledSpan = styled.span`
    ${({ theme, className }) => {
        const classes = styles(theme);
        return {
            ...classes[className]
        }
    }}
`;

const variantMapping = {
    h1: 'h1',
    h2: 'h1',
    h3: 'h1',
    h4: 'h1',
    h5: 'h3',
    h6: 'h2',
    subtitle1: 'h3',
  };
  
const Typography = ({ children, color, variant, marked=false, ...props }) => {
    return(
        <MuiTypography variantMapping={variantMapping} variant={variant} {...props}>
            {children}
            {marked &&
            <StyledSpan className={`marked${capitalize(variant) + capitalize(marked)}`}></StyledSpan>
            }
        </MuiTypography>
    )
}

Typography.propTypes = {
    children: PropTypes.node,
    marked: PropTypes.oneOf([false, 'center', 'left']),
    variant: PropTypes.string,
}

export default Typography;