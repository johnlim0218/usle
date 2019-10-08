import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const StyledContainer = styled(Container)`
    ${({ theme }) => {
        return {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4),
        }
    }};
`;
const StyledDivImgs = styled.div`
    ${({ theme }) => {
        return {
            marginTop: theme.spacing(8),
            }
        }
    }}
    display: flex;
    flex-wrap: wrap;
`;
const StyledDivBackDrop = styled.div`
    ${({ theme }) => {
        return{
            background: theme.palette.common.black,
            transition: theme.transitions.create('opacity'),
        }
    }}
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.5;
`;
const StyledDivImageMarked = styled.div`
    ${({ theme }) => {
        return {
            background: theme.palette.common.white,
            transition: theme.transitions.create('opacity'),
        }
    }}
    height: 3px;
    width: 18px;
    position: absolute;
    bottom: -2px;
    left: calc(50% - 9px);
`;
const StyledTypographyImageTitle = styled(Typography)`
    ${({ theme }) => {
        return{
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
        }
    }};
    position: relative;
    color: white;
`
const StyledDivImageButton = styled.div`
    ${({ theme }) => {
        return{
            color: theme.palette.common.white,
        }
    }}
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledButtonBaseImageWrapper = styled(ButtonBase)`
    
    position: relative;
    display: block;
    padding: 0;
    border-radius: 0;
    width: 100%;    
    height: 100px;
    ${breakpoint('sm')`
        ${({ imageWidth }) => {
            return {
                width: imageWidth,
                height: '40vh',
            }
        }}
    `};
`;
const StyledDivHover = styled.div`
    :hover{
        ${StyledButtonBaseImageWrapper} {
            z-index: -1;
        };
        ${StyledDivBackDrop} {
            opacity: 0.15;
        };
        ${StyledDivImageMarked} {
            opacity: 0;
        };
        ${StyledTypographyImageTitle} {
            border: 4px solid white;
        };
    }
`
const StyledImageSrc = styled.div`
    ${({ imageUrl }) => {
        return {
            backgroundImage: `url(${imageUrl})`,
        }
    }};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-size: cover;
    background-position: center 40%;
  },
`;

const images = [
    {
      url:
        'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80',
      title: 'Snorkeling',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1531299204812-e6d44d9a185c?auto=format&fit=crop&w=400&q=80',
      title: 'Massage',
      width: '20%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=80',
      title: 'Hiking',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400&q=80',
      title: 'Tour',
      width: '38%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1523309996740-d5315f9cc28b?auto=format&fit=crop&w=400&q=80',
      title: 'Gastronomy',
      width: '38%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=400&q=80',
      title: 'Shopping',
      width: '24%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400&q=80',
      title: 'Walking',
      width: '40%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400&q=80',
      title: 'Fitness',
      width: '20%',
    },
    {
      url:
        'https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80',
      title: 'Reading',
      width: '40%',
    },
  ];

const IndexCategories = () => {
    return (
        <StyledContainer component="section">
            <Typography variant="h4" marked="center" align="center" component="h2">
                For all tastes and all desires
            </Typography>
            <StyledDivImgs>
                {images.map((image, i) => (
                    
                    <StyledButtonBaseImageWrapper
                         key={image.title}
                         imageWidth={image.width}
                  >
                      <StyledDivHover>
                        <StyledImageSrc imageUrl={image.url}/>
                        <StyledDivBackDrop/>   
                        <StyledDivImageButton>
                            <StyledTypographyImageTitle component="h3" variant="h6" color="inherit">
                                {image.title}
                                <StyledDivImageMarked/>
                            </StyledTypographyImageTitle>
                        </StyledDivImageButton>
                        </StyledDivHover>
                    </StyledButtonBaseImageWrapper>
                    
                    )
                )}

            </StyledDivImgs>
        </StyledContainer>
    )
}

export default IndexCategories;