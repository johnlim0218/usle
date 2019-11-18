// import React, { useEffect, useState, useCallback } from 'react';
// import styled from 'styled-components';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';

// import { Field } from 'react-final-form';
// import GridItem from '../Grid/GridItem';

// const StyledDivRoot = styled.div`
//     display: flex;
// `

// const CheckboxGroup = (props) => {
//     const { submitting, selection, ...others } = props;
//     const [checked, setChecked] = useState([]);

//     useEffect(() => {
//         console.log(props);
//     }, [selection]);

//     // useEffect(() => {
//     //     let newChecked = []
//     //     selection.map((selection, index) => {
//     //         newChecked.push(index)
//     //     })
//     //     setChecked(newChecked);
        
//     // }, []);
     
//     // const onChangeCheckBox = useCallback((index) => {
        
//     //     const targetSelectionIndex = checked.indexOf(index);
//     //     const newChecked = [...checked];
//     //     if(targetSelectionIndex !== -1) {
//     //         newChecked.splice(targetSelectionIndex, 1);
//     //     } else {
//     //         newChecked.push(index);
//     //     }
//     //     setChecked(newChecked);
//     // }, [checked]);

//     // useEffect(() => {
        
//     //     console.log(checked);
//     // }, [checked])

//     return(
//         // <StyledDivRoot>
//         //     <FormControl component="fieldset">
//         //         <FormGroup row>

//         //             {ProductOptionSelections && ProductOptionSelections.map((selection, index) => (
//         //                  <FormControlLabel
//         //                     key={selection}
//         //                     control={
//         //                         <Checkbox
//         //                             checked={checked && checked.indexOf(index) !== -1 ? true : false}
//         //                             onChange={() => onChangeCheckBox(index)}
//         //                             value={selection.selectionName}
//         //                         />}
//         //                     label={selection.selectionName}
//         //                  />
//         //             ))}
                   
//         //         </FormGroup>
//         //     </FormControl>
//         // </StyledDivRoot>

       
//                 <Field
//                     component={Checkbox}
//                     disabled={submitting}
//                     margin="normal"
//                     required
//                     size="small"
//                     noBorder={false}
//                     fullWidth
//                     {...others}
//             />}
//             label={selection.selectionName}
            
//         />    
//     )
// }

// export default CheckboxGroup;