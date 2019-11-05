import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../Button';
import Typography from '../Typography';

const CategoryDelete = (props) => {
    const { id, open, close, ...others } = props;
    const dispatch = useDispatch();
    
    const onClickDelete = useCallback((e) => (id) => {
        console.log("test");
        e.preventDefault();
        console.log("test");
        
    }, []);

    return (
        <Dialog open={open}>
            <DialogTitle>
                Warning
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    Are you sure?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => console.log(props.id)}>Delete</Button>
                <Button onClick={close}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CategoryDelete;