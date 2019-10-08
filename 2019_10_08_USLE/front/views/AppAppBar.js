import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Search from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import ModifiedAppBar from '../components/AppBar';

const StyledList = styled(List)`
    font-size: 14px;
    margin: 0;
    padding-left: 0;
    list-style: none;
    padding-top: 0;
    padding-bottom: 0;
    color: inherit;
`
const StyledListItem = styled(ListItem)`
    float: left;
    color: inherit;,
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    &:after : {
        width: calc(100% - 30px);
        content: ""
        display: block;
        height: 1px;
        margin-left: 15px;
        background-color: #e5e5e;
    }
    ${breakpoint('md')`
        width: auto;
    `};
`;
const StyledButton = styled(Button)`
    color: inherit;
    position: relative;
    padding: 0.9375rem;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 3px;
    line-height: 20px;
    text-decoration: none;
    margin: 0px;
    display: inline-flex;
    &:hover &:focus : {
        color: inherit;
        background: rgba(200, 200, 200, 0.2)
    },
    ${breakpoint("sm")` 
        width: calc(100% - 30px);
        margin-left: 15px;
        margin-bottom: 8px;
        margin-top: 8px;
        text-align: left;
        & > span:first-child :{
            justify-content: flex-start;
        }
    `};
`;

console.log(breakpoint);

const AppAppBar = ({ ...props }) => {
    
    return(
        <ModifiedAppBar
            leftLinks={
                <StyledList>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Link
                        </StyledButton>
                    </StyledListItem>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                         Link
                        </StyledButton>
                    </StyledListItem>
                    <StyledListItem>
                        <StyledButton
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                         Link
                        </StyledButton>
                    </StyledListItem>
                </StyledList>
            }
            rightLinks={
              <div>
            {/* <CustomInput
              white
              inputRootCustomClasses={classes.inputRootCustomClasses}
              formControlProps={{
                className: classes.formControl
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search",
                  className: classes.searchInput
                }
              }}
            /> */}
                 <Button justIcon round color="white">
              <Search/>
            </Button>
          </div>
        }
      />
    )
}

export default AppAppBar;