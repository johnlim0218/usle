import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Link from 'next/link';
import Router from 'next/router';
import { Field, Form, FormSpy } from 'react-final-form';

import { required } from '../../form/validation';
import Typography from '../Typography';
import RFTextField from '../../form/RFTextField';
import AppForm from '../../views/AppForm';
import FormFeedback from '../../form/FormFeedback';
import FormButton from '../../form/FormButton';

const StyledForm = styled.form`
    padding:30px;
`;

const StyledTextField = styled(RFTextField)`
    padding-right: 5px;
`

const AddOptionDialog = (props) => {
    const { open, close, option, setOption, ...others } = props;
    
    const dispatch = useDispatch();

    const validate = ((values) => {
        // const errors = required(['categoryName'], values);
        return null;
    })

    const onSubmit = useCallback((values) => {
      
        setOption((prevState) => ([
          ...prevState,
          values,
      ]))
      
    }, []);
    

    return(
        <Dialog maxWidth='md' open={open}>
            <DialogTitle>Add Option</DialogTitle>
            <Form 
                onSubmit={onSubmit}
                // subscriptrion - true로 설정한 Field의 속성 값이 바뀔 때 마다 렌더링 해준다.
                subscription={{ submitting: true }}
                validate={validate}
                render={({ handleSubmit, submitting }) => (
                    <StyledForm 
                        onSubmit={handleSubmit}
                        noValidate>

                        <Field
                            autoComplete="Color"
                            autoFocus
                            component={StyledTextField}
                            disabled={submitting}
                            label="Color"
                            margin="normal"
                            name="color"
                            required
                            size="small"
                            noBorder={false}
                        />
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