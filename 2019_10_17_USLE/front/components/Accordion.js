import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMore from "@material-ui/icons/ExpandMore";

const StyledDivAccordionRoot = styled.div`
    flex-grow: 1;
    margin-bottom: 20px;
`;
const StyledExpansionPanel = styled(ExpansionPanel)`
    box-shadow: none;
    & :before {
      display: none;
    }

    .Mui-expanded{
        margin: 0;
    }
`;
const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
    min-height: auto;
    background-color: transparent;
    border-bottom: 1px solid #ddd;
    padding: 25px 10px 5px 0px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    color: black;
    
    .MuiExpansionPanelSummary-content{
        margin: 0;
    }

    .MuiExpansionPanelSummary-expandIcon {
      padding-right: 0;
      padding-left: 0;
    }

    .MuiExpansionPanelSummary-expandIcon.Mui-expanded {
      transform: rotate(180deg);
      padding-right: 0;
      padding-left: 0;
      position: absolute;
      right:-1px;
  }
    
`;
const StyledExpansionDetails = styled(ExpansionPanelDetails)`
    display: block;
    padding: 15px 0px 5px;
    font-size: .875rem;
`;


const Accordion = (props) => {
    const [active, setActive] = useState(
        props.active.length === undefined ? [props.active] : props.active
      );
      const [single] = useState(
        props.active.length === undefined ? true : false
      );
      const handleChange = panel => () => {
        let newArray;
    
        if (single) {
          if (active[0] === panel) {
            newArray = [];
          } else {
            newArray = [panel];
          }
        } else {
          if (active.indexOf(panel) === -1) {
            newArray = [...active, panel];
          } else {
            newArray = [...active];
            newArray.splice(active.indexOf(panel), 1);
          }
        }
        setActive(newArray);
      };
      const { collapses, activeColor } = props;
      
      return (
        <StyledDivAccordionRoot>
          {collapses.map((prop, key) => {
            return (
                <StyledExpansionPanel
                    expanded={active === key || active.indexOf(key) !== -1}
                    onChange={handleChange(key)}
                    key={key}
                >
                    <StyledExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                    >
                       <h4>{prop.title}</h4>
                   </StyledExpansionPanelSummary>
                    <StyledExpansionDetails>
                      {prop.content}
                    </StyledExpansionDetails>
              </StyledExpansionPanel>
            );
          })}
        </StyledDivAccordionRoot>
      );
}


Accordion.defaultProps = {
  active: -1,
};

Accordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired,
  
};

export default Accordion;