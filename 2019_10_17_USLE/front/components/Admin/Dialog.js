import React from 'react'
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Dialog = (props) => {
    const { open, close, title, ...others} = props;
    return(
        <Dialog open={open} onClose={close}>
            <DialogTitle>{title}</DialogTitle>            
        </Dialog>
    )
}

export default Dialog;