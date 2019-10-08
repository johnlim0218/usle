import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

const StyledTypographyRoot = styled(Typography).attrs((props) => ({
    component: 'footer',
}))`
    display: flex;
    background-color: ${props => props.theme.palette.secondary.light};
`;
const StyledContainer = styled(Container)`
    margin-top: ${props => props.theme.spacing(8)}px;
    margin-bottom: ${props => props.theme.spacing(8)}px;
    display: flex;
`;
const StyledGridIconsWrapper = styled(Grid).attrs((props) => ({
    direction: 'column',
    justify: 'flex-end',
    spacing: 2
}))`
    height: 120px;
`
const StyledGridIcons = styled(Grid)`
    display: flex;
`
const StyledaTagIcon = styled.a`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.palette.warning.main};
    margin-right: ${props => props.theme.spacing(1)}px;
    &:hover: {
        background-color: ${props => props.theme.palette.warning.dark};
    }
`
const StyledUl = styled.ul`
    margin: 0;
    list-style: none;
    padding-left: 0;
`;
const StyledLi = styled.li`
    padding-top: ${props => props.theme.spacing(0.5)}px;
    padding-bottom: ${props => props.theme.spacing(0.5)}px;
`;
const StyledTextField = styled(TextField).attrs((props) => ({
    SelectProps: {
        native: true,
    }
}))`
    margin-top: ${props => props.theme.spacing(1)}px;
    width: 150px;
`;

const LANGUAGES = [
    {
      code: 'en-US',
      name: 'English',
    },
    {
      code: 'fr-FR',
      name: 'Français',
    },
  ];

const Copyright = () => {
    return(
        <>
            {'Copyright @ '}
            <Link>
                <a color="inherit" href="https://material-ui.com">
                    Usle
                </a>
            </Link>{' '}
            {new Date().getFullYear()}
        </>
    )
}

const AppFooter = () => {
    return (
        <StyledTypographyRoot>
            <StyledContainer>
                <Grid container spacing={5}>
                    <Grid item xs={6} md={3}>
                        <StyledGridIconsWrapper container>
                            <StyledGridIcons item>
                                <StyledaTagIcon href="https://material-ui.com/">
                                    <img src="https://material-ui.com/static/themes/onepirate/appFooterFacebook.png" alt="Facebook" />
                                </StyledaTagIcon>
                                <StyledaTagIcon href="https://twitter.com/MaterialUI/">
                                    <img src="https://material-ui.com/static/themes/onepirate/appFooterTwitter.png" alt="Twitter"/>
                                </StyledaTagIcon>
                            </StyledGridIcons>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </StyledGridIconsWrapper>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Legal
                        </Typography> 
                        <StyledUl>
                            <StyledLi>
                                <Link><a href="/premium-themes/onepirate/terms/">Terms</a></Link>
                            </StyledLi>
                            <StyledLi>
                                <Link><a href="/premium-themes/onepirate/privacy/">Privacy</a></Link>
                            </StyledLi>
                        </StyledUl>
                    </Grid>
                    <Grid item xs={6} sm={8} md={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            Language
                        </Typography>
                        <StyledTextField 
                            select
                        >
                           {LANGUAGES.map((value, index) => (
                                <option key={value.code} value={value.code}>
                                    {value.name}
                                </option>  
                           ))} 
                        </StyledTextField>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">
                        {'Icons made by '}
                        <Link>
                            <a href="https://www.freepik.com" rel="nofollow" title="Freepik">
                                Freepik
                            </a>
                        </Link>
                        {' from '}
                        <Link>
                            <a href="https://www.flaticon.com" rel="nofollow" title="Flaticon">
                                www.flaticon.com
                            </a>
                        </Link>
                        {' is licensed by '}
                        <Link>
                            <a
                            href="https://creativecommons.org/licenses/by/3.0/"
                            title="Creative Commons BY 3.0"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                CC 3.0 BY
                            </a>
                        </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </StyledContainer>
        </StyledTypographyRoot>
    )
}

export default AppFooter;