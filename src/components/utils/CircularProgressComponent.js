import React, { useState, useImperativeHandle } from 'react'

import { Dialog, DialogContent, CircularProgress } from "@material-ui/core/";

function CircularProgressComponent(props) {
    return (
        <Dialog
            open={props.showProgress}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <CircularProgress />
            </DialogContent>

        </Dialog>
    )
}


export default CircularProgressComponent

