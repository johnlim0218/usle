import React, { useEffect } from 'react';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import GridItem from '../../components/Grid/GridItem';

const StyledDivRoot = styled.div`
    display: flex;
`
const CheckboxGroup = ({ ProductOptionSelections }) => {
    
    useEffect(() => {
        
    }, [ProductOptionSelections]);
    
    const handleChangeCheckbox = (name) => (e) => {

    };

    return(
        <StyledDivRoot>
            <FormControl component="fieldset">
                <FormGroup row>

                    {ProductOptionSelections && ProductOptionSelections.map((selection, index) => (
                         <FormControlLabel
                         control={
                             <Checkbox
                                 checked={true}
                                 onChange={handleChangeCheckbox()}
                                 value={selection.id}
                             />}
                         label={selection.selectionName}
                     />
                    ))}
                   
                </FormGroup>
            </FormControl>
        </StyledDivRoot>
    )
}

export default CheckboxGroup;