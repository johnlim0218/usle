import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CategoryAdd from '../../components/Admin/CategoryAdd';
import Tooltip from '../../components/Tooltip';
import Typography from '../../components/Typography'
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { StyledDivMain } from '../product';

import { CATEGORIES_LOAD_REQUEST } from '../../reducers/admin/adminCategoryReducer';

const Category = () => {
    const [open, setOpen] = useState(false);
    const { categories } = useSelector((state) => state.adminCategoryReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: CATEGORIES_LOAD_REQUEST,
        })
        
    }, []);

    const onClickAdd = useCallback((e) => {
        e.preventDefault();
        setOpen(true);
    }, [open]);

    const onClickClose = useCallback((e) => {
        e.preventDefault();
        setOpen(false);
    }, [open]);

    return(
        <div>
        <StyledDivMain>
            <Card plain>
                <CardBody plain>
                    <Typography variant="h4">Category</Typography>
                    <Button onClick={onClickAdd}>Add Category</Button>
                    <CategoryAdd open={open} close={onClickClose}/>
                    <Table
                        tableHead={[
                            "NAME",
                            "DESCRIPTION",
                            "REGISTED",
                            "UPDATED",
                        ]}
                        tableData={
                            categories && !categories.deletedAt && categories.map((value, index) => ([
                                    <span>
                                        {value.categoryName}
                                    </span>,
                                    <span>
                                        {value.description}
                                    </span>,
                                    <span>
                                        {value.createdAt}
                                    </span>,
                                    <span>
                                        {value.updatedAt}
                                    </span>,
                                    <Tooltip
                                        id="close1"
                                        title="Delete it"
                                        placement="right"
                                    >
                                        <Button size="small">
                                            {"DELETE"}
                                        </Button>
                                    </Tooltip>
                                ])
                            )
                        }
                    />
                </CardBody>
            </Card>
        </StyledDivMain>

    </div>
    )
};

export default Category;