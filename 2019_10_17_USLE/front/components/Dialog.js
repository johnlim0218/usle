import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../components/Button';

const ModifiedDialog = (props) => {
    const {open, close, message, redirectLink, ...others} = props;
    
    return (
        <Dialog open={open}>
             <DialogTitle>Message</DialogTitle>
             <DialogContent>
                 <DialogContentText>{message}</DialogContentText>
             </DialogContent>
             <DialogActions>
                <Button onClick={close}>
                    Disagree
                </Button>
                
                <Link href={redirectLink}>
                    <Button onClick={close}>
                        Agree
                    </Button>
                </Link>
            
             </DialogActions>
        </Dialog>
    )
}

ModifiedDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func,
    message: PropTypes.string,
    redirectLink: PropTypes.string,
}

export default ModifiedDialog;