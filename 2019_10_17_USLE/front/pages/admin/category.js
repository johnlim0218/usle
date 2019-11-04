import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Tooltip from '../../components/Tooltip';
import Typography from '../../components/Typography'
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { StyledDivMain } from '../product';

import { dummyCartData } from '../../dummy/dummy';
import { CATEGORIES_LOAD_REQUEST } from '../../reducers/admin/adminCategoryReducer';


const Category = () => {
    const { categories } = useSelector((state) => state.adminCategoryReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: CATEGORIES_LOAD_REQUEST,
        })
        
    }, []);

    const onClickAdd = (e) => {
        e.preventDefault();
    }

    return(
        <div>
        <StyledDivMain>
            <Card plain>
                <CardBody plain>
                    <Typography variant="h4">Category</Typography>
                    <Button onClick={onClickAdd}>Add Category</Button>
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
                                        title="Shipping tracking"
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