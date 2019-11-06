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
import { NEW_BRAND_POST_REQUEST } from '../../reducers/admin/adminBrandReducer';


const StyledForm = styled.form`
    padding:30px;
`;
const BrandAdd = (props) => {
    const { open, close, ...others } = props;
    const { isPostingNewCategory, postNewCategoryErrorReason } = useSelector(state => state.adminCategoryReducer);
    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = required(['brandName'], values);
        return errors;
    }

    const onSubmit = useCallback((values) => {
        dispatch({
            type: NEW_BRAND_POST_REQUEST,
            data: values,
        })
        
    }, []);

    return(
        <Dialog open={open}>
            <DialogTitle>Add Brand</DialogTitle>
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
                            autoComplete="Brand"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || isPostingNewCategory}
                            fullWidth
                            label="Brand"
                            margin="normal"
                            name="brandName"
                            required
                            size="small"
                            noBorder={false}
                        />
                         <Field
                            autoComplete="Phone"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || isPostingNewCategory}
                            fullWidth
                            label="Phone"
                            margin="normal"
                            name="phone"
                            size="small"
                            noBorder={false}
                        />
                         <Field
                            autoComplete="Zipcode"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || isPostingNewCategory}
                            fullWidth
                            label="Zipcode"
                            margin="normal"
                            name="zipcode"
                            size="small"
                            noBorder={false}
                        />
                         <Field
                            autoComplete="Address"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || isPostingNewCategory}
                            fullWidth
                            label="Address"
                            margin="normal"
                            name="address"
                            size="small"
                            noBorder={false}
                        />
                        <Field
                            autoComplete="Address Detail"
                            autoFocus
                            component={RFTextField}
                            disabled={submitting || isPostingNewCategory}
                            fullWidth
                            label="Address Detail"
                            margin="normal"
                            name="addressDetail"
                            size="small"
                            noBorder={false}
                        />
                        <Field
                            autoComplete="description"
                            component={RFTextField}
                            disabled={submitting || isPostingNewCategory}
                            fullWidth
                            label="Description"
                            margin="normal"
                            name="description"
                            size="small"
                            noBorder={false}
                        />
                        <FormButton
                            type="submit"
                            disabled={submitting || isPostingNewCategory}
                            size="large"
                            color="secondary"
                            fullWidth
                        >
                            {submitting || isPostingNewCategory ? 'In progress…' : 'Add'}
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
                                postNewCategoryErrorReason !=='' ? (
                                    <FormFeedback error>
                                        {postNewCategoryErrorReason}
                                    </FormFeedback>
                                ) : null
                        )}/>
                    </StyledForm>
                )}/>            
        </Dialog>
    )
}

export default BrandAdd;