import React, { useImperativeHandle,forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const SuccesMessageBox=forwardRef((props, ref) => { 
    const [open, setOpen] = React.useState(false);
    const { message, title } = props;
  
    const handleClose = () => {
        setOpen(false);
    };

    const showDialog = () => {
        setOpen(true);
    };

    useImperativeHandle(ref, () => {
        return {
          showDialog: showDialog
        };
    });

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})

export default SuccesMessageBox;