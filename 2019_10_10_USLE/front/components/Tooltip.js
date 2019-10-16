import React from 'react';
import styled from 'styled-components';
import MuiTooltip from '@material-ui/core/Tooltip';

const Tooltip = styled(props => (
    <MuiTooltip
        classes={{ popper: props.className, tooltip: 'tooltip'}}
        {...props}
    />
))`
& .tooltip{
  padding: 10px 15px;
  min-width: 130px;
  color: ${props => props.theme.palette.text.primary};
  line-height: 1.7em;
  background-color: ${props => props.theme.palette.secondary.light};
  border: none;
  border-radius: 3px;
  box-shadow:
      0 2px 2px 0 rgba(153, 153, 153, 0.14), 
      0 3px 1px -2px rgba(153, 153, 153, 0.2), 
      0 1px 5px 0 rgba(153, 153, 153, 0.12);
  max-width: 200px;
  text-align: center;
  font-size: 0.875em;
  font-style: normal;
  font-weight: 400;
  text-shadow: none;
  text-transform: none;
  letter-spacing: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  white-space: normal;
  line-break: auto;
}
`


export default Tooltip;
