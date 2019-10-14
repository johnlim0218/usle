import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const ModifiedButton = styled(Button)`
    &.MuiButton-root{
        border-radius: 0;
        font-weight: ${props => props.theme.typography.fontWeightMedium};
        font-family: ${props => props.theme.typography.fontFamilySecondary};
        padding: ${props => props.theme.spacing(2, 4)};
        font-size: ${props => props.theme.typography.pxToRem(14)}px;
        box-shadow: none;
        &:hover &:active &:focus {
          box-shadow: none;
        };
    };
    &.MuiButton-sizeLarge {
        padding: ${props => props.theme.spacing(2, 5)};
        font-size: ${props => props.theme.typography.pxToRem(16)}px;
    };
    &.MuiButton-sizeSmall {
        padding: ${props => props.theme.spacing(1, 3)};
        font-size: ${props => props.theme.typography.pxToRem(13)}px;
    };
`;

export default ModifiedButton;
