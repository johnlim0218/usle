import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Link from 'next/link';
import Router from 'next/router';
import { Field, Form, FormSpy } from 'react-final-form';
// import { Checkbox } from 'final-form-material-ui';

import { required } from '../../form/validation';
import Button from '../Button';
import Typography from '../Typography';
import RFTextField from '../../form/RFTextField';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
// import Checkbox from './Checkbox';
import AppForm from '../../views/AppForm';
import FormFeedback from '../../form/FormFeedback';
import FormButton from '../../form/FormButton';

import {
    SEARCH_OPTION_NAME_REQUEST
} from '../../reducers/admin/adminProductReducer';

const StyledForm = styled.form`
    padding:30px;
`;
const StyledContainter = styled(Container)`
    ${props => props.theme.container}
    display: flex;
`
const StyledFormButton = styled(FormButton)`
    width: 100%;
    margin-top: 25px;
    
`
const StyledDivCenter = styled.div`
    text-align: center;
`
const StyledTextField = styled(RFTextField)`
    padding-right: 5px;
`

const AddOptionDialog = (props) => {
    const { open, close, option, setOption, ...others } = props;
    const [options, setOptions] = useState([]); // 옵션 명
    const [optionArray, setOptionArray] = useState([]); // 옵션 조합
    const { optionData } = useSelector(state => state.adminProductReducer);
                                            
    const dispatch = useDispatch();
    
    const validate = ((values) => {
        // const errors = required(['categoryName'], values);
        return null;
    })
    
    const onSubmitOptionName = useCallback((value) => {
        dispatch({
            type: SEARCH_OPTION_NAME_REQUEST,
            data: value.optionName,
        });

        setOptions((prevState) => ([
            ...prevState,
            value.optionName,
        ]));
    }, [options]);

    const onSubmitOptionSelections = useCallback((values) => {
        let optionArray = [];
        let inner = [];
        options.map((optionName, index) => {
            inner = [];
            values[optionName].map((v, i) => {
                // console.log(v.selectionName);
                // inner.push(v.selectionName);
                inner.push(JSON.stringify(v));
            })
            // optionArray.push(values[optionName]);
            optionArray.push(inner);
         })

        // options.map((optionName, index) => {
        //     optionArray.push(JSON.stringify(values[optionName]));
        // })

        console.log(optionArray);

        const a = ['1','2','3','4'];
        const b = ['5','6','7'];
        const c = ['8','9'];
        const d = ['10', '11'];
        const arrayABC = [a, b, c, d];
        
        const allPossibleCases = (arr) => {
            if(arr.length === 1){
                return arr[0]
            } else {
                let result = [];
                let allCasesOfRest = allPossibleCases(arr.slice(1));
                
                for(let i = 0; i < allCasesOfRest.length; i++) {
                    for(let j = 0; j < arr[0].length; j++){
                        result.push(arr[0][j] + ',' + allCasesOfRest[i]);
                    }
                }
                return result;
            }
        }

        setOptionArray(allPossibleCases(optionArray));
        

    }, [options]);

    useEffect(() => {
        
        let jsonArray = [];
        optionArray.map((value, index) => {
            jsonArray.push(JSON.parse('['+value+']'));
        })
        console.log(jsonArray);
    }, [optionArray])
    
    const onSubmitAddOptions = useCallback((values) => {
        setOption((prevState) => ([
          ...prevState,
          values,
      ]))
    }, []);
    

    return(
        <Dialog maxWidth='xl' open={open}>
            <DialogTitle>Add Option</DialogTitle>
            <Form 
                onSubmit={onSubmitOptionName}
                // subscription - true로 설정한 Field의 속성 값이 바뀔 때 마다 렌더링 해준다.
                subscription={{ submitting: true }}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate>
                            <GridContainer>
                                <GridItem xs={3}>
                                    <Field
                                        component={StyledTextField}
                                        disabled={submitting}
                                        label="OptionName"
                                        margin="normal"
                                        name="optionName"
                                        required
                                        size="small"
                                        noBorder={false}
                                        fullWidth
                                    />
                                </GridItem>
                             
                                <GridItem xs={1}>
                                    <StyledFormButton
                                        type="submit"
                                        disabled={submitting}
                                        
                                    >
                                        {submitting ? 'In progress…' : 'Add'}
                                    </StyledFormButton>    
                                </GridItem>
                            </GridContainer>
                        </StyledForm>
                    )}/>

            <Form
                onSubmit={onSubmitOptionSelections}
                subscription={{ submitting: true }}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate>
                            <GridContainer>
                                <GridItem xs={3}>
                                    Option
                                </GridItem>
                                <GridItem xs={6}>
                                    Selection
                                </GridItem>
                            </GridContainer>

                                {optionData && optionData.map((option, index) => (
                                    <div key={option}>
                                        <GridContainer>
                                            <GridItem xs={3}>
                                                {/* <Field
                                                    component={StyledTextField}
                                                    type='text'
                                                    disabled={true}
                                                    margin="normal"
                                                    name='OptionName'
                                                    initialValue={option.optionName}
                                                    required
                                                    size="small"
                                                    noBorder={true}
                                                    fullWidth
                                                /> */}
                                                <h3>
                                                    {option.optionName}
                                                </h3>
                                            </GridItem>
                                            <GridItem xs={7}>
                                                <FormControl 
                                                    component="fieldset">
                                                    <FormGroup row>
                                                        
                                                        {option.ProductOptionSelections && option.ProductOptionSelections.map((selection, index) => (
                                                            <FormControlLabel
                                                                key={selection}
                                                                label={selection.selectionName}
                                                                control={
                                                                    <Field
                                                                        component='input'
                                                                        type='checkbox'
                                                                        name={option.optionName}
                                                                        value={selection}
                                                                    />
                                                                }
                                                            />
                                                        ))}
                                                            
                                                    </FormGroup>
                                                </FormControl>   
                                            </GridItem>
                                            <GridItem xs={1}>
                                                <StyledFormButton
                                                    size='small'
                                                    justIcon
                                                    round
                                                > 
                                                <CreateIcon/>
                                                </StyledFormButton>
                                            </GridItem>
                                            <GridItem xs={1}>
                                                <StyledFormButton
                                                    size='small'
                                                    justIcon
                                                    round
                                                >
                                                    <RemoveCircleOutlineIcon/>
                                                </StyledFormButton>
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            
                                        </GridContainer>
                                    </div>
                                ))}

                            <StyledFormButton
                                type='submit'
                                size='small'
                                justIcon
                                round
                            >
                                GENERATE
                            </StyledFormButton>     
                    </StyledForm>         
                )}/>
 
            <Form 
                onSubmit={onSubmitAddOptions}
                // subscription - true로 설정한 Field의 속성 값이 바뀔 때 마다 렌더링 해준다.
                subscription={{ submitting: true }}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate> 
                            <GridContainer>
                                {options.map((optionName, index) => {
                                    <GridItem>
                                        {optionName}
                                    </GridItem>
                                })}
                                <GridItem>
                                    Additional Price
                                </GridItem>
                                <GridItem>
                                    Quantity
                                </GridItem>
                            </GridContainer>

                         
                            <Field
                                autoComplete="Size"
                                autoFocus
                                component={StyledTextField}
                                disabled={submitting}
                                label="Size"
                                margin="normal"
                                name="size"
                                required
                                size="small"
                                noBorder={false}
                            />
                        
                            <Field
                                autoComplete="Price"
                                component={StyledTextField}
                                disabled={submitting}
                                label="Price"
                                margin="normal"
                                name="price"
                                required
                                size="small"
                                noBorder={false}
                            />
                            <Field
                                autoComplete="Quantity"
                                component={StyledTextField}
                                disabled={submitting}
                                label="Quantity"
                                margin="normal"
                                name="quantity"
                                required
                                size="small"
                                noBorder={false}
                            />

                            {/* <Button
                                size='small'
                                justIcon
                                round
                            >
                                <AddCircleIcon/>
                            </Button>
                            <Button
                                size='small'
                                justIcon
                                round
                            >
                                <RemoveCircleOutlineIcon/>
                            </Button> */}
                        
                    
                        <FormButton
                            type="submit"
                            disabled={submitting}
                            size="large"
                            color="secondary"
                            fullWidth
                        >
                            {submitting ? 'In progress…' : 'Add'}
                        </FormButton>
                        <FormButton
                            fullWidth
                            onClick={close}
                        >
                            Close
                        </FormButton>
                        {/* FormSpy는 기본적으로 form을 subscript하고 있다? */}
                        <FormSpy
                            subscription={{ submitError:true }}
                            render={({ submitError }) => (
                                null
                        )}/>
                    </StyledForm>
                )}/>            
        </Dialog>
    )
}

export default AddOptionDialog;