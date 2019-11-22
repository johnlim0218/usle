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
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
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
    
    const required = value => (value ? undefined : "Required");
    
    const validateOptionName = ((values) => {
        const errors = required(['categoryName'], values);

        return errors;
    })
    const validateSelection = ((values) => {

        let errors = null;

        options.map((optionName, index) => {
            errors = values[optionName] ? (values[optionName] !== undefined && values[optionName].length !== 0 ? undefined : "Required" ) : "Required";
        })

        return errors;
    })
    
    const validateOptions = ((values) => {

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
                // 재귀함수를 돌리기 위해 JSON의 형태로 변환
                // optionName 프로퍼티를 삽입해준다.
                let addProps = {
                    ...v,
                    optionName: optionName
                }
                inner.push(JSON.stringify(addProps));
            })
            optionArray.push(inner);
         })
         
         // 옵션 상세 사항들의 모든 조합을 도출해내는 재귀함수
        const allPossibleCases = (arr) => {
            if(arr.length === 1){
                return arr[0]
            } else {
                let result = [];
                let allCasesOfRest = allPossibleCases(arr.slice(1));
                
                allCasesOfRest.map((allCasesOfRestValue, indexI) => {
                    arr[0].map((arrValue, indexJ) => {
                        result.push(arrValue + ' , ' + allCasesOfRestValue);
                    })
                })
                return result;
            }
        }

        let resultArray = allPossibleCases(optionArray);
        let jsonArray = [];
        // 추가 가격, 재고 
        const additionalProps = {
            additionalPrice: 0,
            quantity: 1,
        };
        let selection = '';
        let selectionProps = {};

        resultArray.map((value, index) => {
            selection = JSON.parse('['+value+']');
            selectionProps = {
                selection,
                additionalProps,
            }
            // JSON을 객체의 형태로 다시 변환
            jsonArray.push(selectionProps);
        })
        setOptionArray(jsonArray);
        
    }, [options]);

    useEffect(() => {
       
       console.log(optionArray);
       
    }, [optionArray])
    
    const onSubmitAddOptions = useCallback((values) => {
        console.log(values);
        setOption((prevState) => ({
          ...prevState,
          ...values,
        }))
        
    }, []);
    

    return(
        <Dialog maxWidth='xl' open={open}>
            <DialogTitle>Add Option</DialogTitle>
            <Form 
                onSubmit={onSubmitOptionName}
                // subscription - true로 설정한 Field의 속성 값이 바뀔 때 마다 렌더링 해준다.
                subscription={{ submitting: true }}
                validate={validateOptionName}
                render={({ handleSubmit, submitting }) => (
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate
                    >
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
                validate={validateSelection}
                render={({ handleSubmit, submitting }) => (
                    
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate
                    >
                            <GridContainer>
                                <GridItem xs={3}>
                                    Option
                                </GridItem>
                                <GridItem xs={6}>
                                    Selection
                                </GridItem>
                            </GridContainer>

                            {optionData && optionData.map((option, index) => (
                                <div 
                                    key={option}
                                >
                                    <GridContainer>
                                        <GridItem xs={3}>
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
                                                                    required
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
                initialValues={{
                    options: [
                     ...optionArray,
                     
                    ]
                }}
                mutators={{
                    ...arrayMutators
                }}
                validate={validateOptions}
                render={({ 
                    values,
                    handleSubmit, 
                    submitting,
                    form:{
                        mutators: { push, pop }
                    }}) => (
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate
                    > 
                            <GridContainer>
                                {options && options.map((optionName, index) => (
                                    <GridItem 
                                        key={optionName}
                                        xs={2}
                                    >
                                        {optionName}
                                    </GridItem>
                                ))}
                                <GridItem xs={3}>
                                    Additional Price
                                </GridItem>
                                <GridItem xs={2}>
                                    Quantity
                                </GridItem>
                            </GridContainer>
                            
                            <FieldArray name="options">
                                {({ fields }) => (
                                        fields.map((selection, selectionIndex) => (
                                            <GridContainer
                                                key={selection}
                                            >
                                                {options.map((optionName, optionNameIndex) => (
                                                    <GridItem
                                                        key={optionName}
                                                        xs={2}
                                                    >
                                                        <Field
                                                            component={StyledTextField}
                                                            disabled={submitting}
                                                            margin="normal"
                                                            name={`${selection}.selection.${optionNameIndex}.selectionName`}
                                                            size="small"
                                                            disabled
                                                            noBorder={false}
                                                        />
                                                    </GridItem>
                                                    
                                                ))}
                                                <GridItem xs={3}>
                                                    <Field
                                                        component={StyledTextField}
                                                        disabled={submitting}
                                                        margin="normal"
                                                        name={`${selection}.additionalProps.additionalPrice`}
                                                        required
                                                        size="small"
                                                        noBorder={false}
                                                    />
                                                </GridItem>
                                                <GridItem xs={2}>
                                                    <Field
                                                        component={StyledTextField}
                                                        disabled={submitting}
                                                        margin="normal"
                                                        name={`${selection}.additionalProps.quantity`}
                                                        required
                                                        size="small"
                                                        noBorder={false}
                                                    />
                                                </GridItem>
                                            </GridContainer>
                                           
                                        ))                 

                                )}
                            </FieldArray>

                            <FormButton
                                type="submit"
                                disabled={submitting}
                                size="small"
                                color="secondary"
                                fullWidth
                            >
                                {submitting ? 'In progress…' : 'Add'}
                            </FormButton>
                            <FormButton
                                fullWidth
                                size="small"
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