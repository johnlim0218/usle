import React from 'react';

import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const FooterWrapper = styled.div`
    background-color: #e6d3b3;
    color: #656565;
    text-align: left;
`;
const AlignCenter = styled.div`
    width: 1080px;
    margin: 0 auto;
    position:relative;
    text-align:center;
`;

const Footer = () => {
    return(
        <FooterWrapper>
            <AlignCenter>
                <div>
                    <h2>
                        Share with us how you're using your Package Free purchases to reduce your waste by tagging us @packagefreeshop on Instagram!
                    </h2>
                </div>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Paper>
                                <div>
                                    Title
                                </div>
                                <div>
                                    Content
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper>
                                <div>
                                    Title
                                </div>
                                <div>
                                    Content
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper>
                                <div>
                                    Title
                                </div>
                                <div>
                                    Content
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper>
                                <div>
                                    Title
                                </div>
                                <div>
                                    Content
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </AlignCenter>
        </FooterWrapper>
    )
}

export default Footer;