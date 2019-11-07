import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import BrandAdd from '../../components/Admin/BrandAdd';
import Tooltip from '../../components/Tooltip';
import Typography from '../../components/Typography'
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { StyledDivMain } from '../product';
import { BRANDS_LOAD_REQUEST, BRAND_DELETE_REQUEST } from '../../reducers/admin/adminBrandReducer';



const Brand = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const { brands } = useSelector((state) => state.adminBrandReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: BRANDS_LOAD_REQUEST,
            data: {
                requestType: 'all',
            }
        })
        
    }, []);

    const onClickAdd = useCallback((e) => {
        e.preventDefault();
        setAddOpen(!addOpen);
    }, [addOpen]);

    const onClickDelete = useCallback((id) => (e) => {
        e.preventDefault();
        setDeleteTarget(id);
        setDeleteOpen(!deleteOpen);
    
    }, [deleteTarget, deleteOpen]);

    const onClickDeleteConfirm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: BRAND_DELETE_REQUEST,
            data: deleteTarget,
        })
        setDeleteOpen(false);

    }, [deleteOpen])
      
    return(
        <div>
        <StyledDivMain>
            <Card plain>
                <CardBody plain>
                    <Typography variant="h4">Brand</Typography>
                    <Button onClick={onClickAdd}>
                        Add Brand
                    </Button>
                    <BrandAdd open={addOpen} close={onClickAdd}/>
                    <Table
                        tableHead={[
                            "NAME",
                            "PHONE",
                            "ZIPCODE",
                            "ADDRESS",
                            "ADDR DETAIL",
                            "DESCRIPTION",
                            "REGISTED",
                            "UPDATED",
                            "DELETE",
                        ]}
                        tableData={
                            brands && !brands.deletedAt && brands.map((value, index) => ([
                                    <span key={value.id}>
                                        {value.brandName}
                                    </span>,
                                    <span key={value.id}>
                                        {value.phone}
                                    </span>,
                                    <span key={value.id}>
                                        {value.zipcode}
                                    </span>,
                                    <span key={value.id}>
                                        {value.address}
                                    </span>,
                                    <span key={value.id}>
                                        {value.addressDetail}
                                    </span>,
                                    <span key={value.id}>
                                        {value.description}
                                    </span>,
                                    <span key={value.id}>
                                        {value.createdAt}
                                    </span>,
                                    <span key={value.id}>
                                        {value.updatedAt}
                                    </span>,
                                    <div>
                                        <Button onClick={onClickDelete(value.id)} size="small" >
                                            DELETE
                                        </Button>
                                    </div>
                                ])
                            )
                        }
                    />
                </CardBody>
            </Card>
        </StyledDivMain>
        <Dialog open={deleteOpen}>
            <DialogTitle>
                Warning
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    Are you sure?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickDeleteConfirm}>Delete</Button>
                <Button onClick={onClickDelete()}>Cancel</Button>
            </DialogActions>
        </Dialog>     
    </div>
    )
};

export default Brand;