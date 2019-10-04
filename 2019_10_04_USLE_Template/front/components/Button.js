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

const StyledButton = styled(Button)`
    &.MuiButton-root{
        ${({ theme }) => {
            const classes = styles(theme);
            console.log("root");
            return{
                ...classes.root,
            }
        }};
    };
    &.MuiButton-sizeLarge {
        ${({ theme }) => {
            const classes = styles(theme);
            console.log("sizeLarge");
            return{
                ...classes.sizeLarge,
            }
        }};
    };
    &.MuiButton-sizeSmall {
        ${({ theme }) => {
            const classes = styles(theme);
            console.log("sizeSmall");
            return{
                ...classes.sizeSmall,
            }
        }};
    };
`;

const ThisButton = () => {

    return (
        <>
        <StyledButton 
            color="secondary"
            variant="contained"
            size="large"
            component="a">Button</StyledButton>
        <Button size="small">Button2</Button>
        </>
    )
}

export default ThisButton;
