import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import CategoryAdd from '../../components/Admin/CategoryAdd';
import CategoryDelete from '../../components/Admin/CategoryDelete';
import Tooltip from '../../components/Tooltip';
import Typography from '../../components/Typography'
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { StyledDivMain } from '../product';

import { CATEGORIES_LOAD_REQUEST, CATEGORIES_DELETE_REQUEST } from '../../reducers/admin/adminCategoryReducer';


const Category = () => {
    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const { categories } = useSelector((state) => state.adminCategoryReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: CATEGORIES_LOAD_REQUEST,
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
            type: CATEGORIES_DELETE_REQUEST,
            data: deleteTarget,
        })
        setDeleteOpen(false);

    }, [deleteOpen])
      
    return(
        <div>
        <StyledDivMain>
            <Card plain>
                <CardBody plain>
                    <Typography variant="h4">Category</Typography>
                    <Button onClick={onClickAdd}>
                        Add Category
                    </Button>
                    <CategoryAdd open={addOpen} close={onClickAdd}/>
                    <Table
                        tableHead={[
                            "NAME",
                            "DESCRIPTION",
                            "REGISTED",
                            "UPDATED",
                            "DELETE",
                        ]}
                        tableData={
                            categories && !categories.deletedAt && categories.map((value, index) => ([
                                    <span key={value.id}>
                                        {value.categoryName}
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

export default Category;