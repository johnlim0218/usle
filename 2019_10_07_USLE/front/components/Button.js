import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const styles = (theme) => ({
    root: {
        borderRadius: 0,
        fontWeight: theme.typography.fontWeightMedium,
        fontFamily: theme.typography.fontFamilySecondary,
        padding: theme.spacing(2, 4),
        fontSize: theme.typography.pxToRem(14),
        boxShadow: 'none',
        '&:active, &:focus': {
          boxShadow: 'none',
        },
      },
      sizeSmall: {
        padding: theme.spacing(1, 3),
        fontSize: theme.typography.pxToRem(13),
      },
      sizeLarge: {
        padding: theme.spacing(2, 5),
        fontSize: theme.typography.pxToRem(16),
      },
    });

const ModifiedButton = styled(Button)`
    &.MuiButton-root{
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.root,
            }
        }};
    };
    &.MuiButton-sizeLarge {
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.sizeLarge,
            }
        }};
    };
    &.MuiButton-sizeSmall {
        ${({ theme }) => {
            const classes = styles(theme);
            return{
                ...classes.sizeSmall,
            }
        }};
    };
`;

export default ModifiedButton;
