import React, { useEffect, useState, useCallback } from 'react';
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
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        let newChecked = []
        ProductOptionSelections.map((selection, index) => {
            newChecked.push(index)
        })
        setChecked(newChecked);
        console.log(checked);
    }, []);
     
    const onChangeCheckBox = useCallback((index) => {
        
        const targetSelectionIndex = checked.indexOf(index);
        const newChecked = [...checked];
        if(targetSelectionIndex !== -1) {
            newChecked.splice(targetSelectionIndex, 1);
        } else {
            newChecked.push(index);
        }
        setChecked(newChecked);
    }, [checked]);

    useEffect(() => {
        
        console.log(checked);
    }, [checked])

    return(
        <StyledDivRoot>
            <FormControl component="fieldset">
                <FormGroup row>

                    {ProductOptionSelections && ProductOptionSelections.map((selection, index) => (
                         <FormControlLabel
                            key={selection}
                            control={
                                <Checkbox
                                    checked={checked && checked.indexOf(index) !== -1 ? true : false}
                                    onChange={() => onChangeCheckBox(index)}
                                    value={selection.selectionName}
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