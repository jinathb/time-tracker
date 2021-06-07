import React, { useState, forwardRef,useImperativeHandle} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types'

const TimeRecord = forwardRef((props,ref) => {
    const [open, setOpen] = useState(false);


    function handleClose(params) {
        setOpen(false);
    }


    const showDialog = () => {
        setOpen(true);
    };

    useImperativeHandle(ref, () => {
        return {
          showDialog: showDialog
        };
    });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    close
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
})

TimeRecord.propTypes = {

}

export default TimeRecord

