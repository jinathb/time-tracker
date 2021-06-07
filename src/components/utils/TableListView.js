import React, { useEffect, useState, ref } from "react";
import { Grid, Button, Card, CardHeader, CardContent, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core/";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgressComponent from '../utils/CircularProgressComponent';
import PropTypes from 'prop-types';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';


const TableListView = ((props, ref) => {
    const history = useHistory();

    const [columns, setColumns] = useState([]);
    const [allRecords, setAllRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [isLoaded, setisLoaded] = useState(false);
    const [addButonOn, setAddButonOn] = useState(false)
    const [editRowsModel, setEditRowsModel] = React.useState({});

    useEffect(() => {
        let { columns, rows, addButton, deleteButton, editButton } = props;
        setAllRecords(rows);
        makeColumns(editButton, deleteButton, columns);
        setAddButonOn(addButton);
        setisLoaded(true);
        return () => {
            setisLoaded(false);
        }
    }, [props]);


    function makeColumns(editOn, deleteOn, existingColumns) {
        console.log("**********************************************************************************");
        console.log(existingColumns);
        let editExist= existingColumns.some(item => item.field==="edit");
        if (editOn && !editExist) {
            
            let editColumn = {
                field: 'edit',
                headerName: ' ',
                hide: false,
                flex: .3,
                renderCell: (params) => renderEditButton(params),
                disableClickEventBubbling: true,
                align:"center"
            }
            existingColumns.push(editColumn);
        }
        let deleteExist= existingColumns.some(item => item.field==="delete");
        if (deleteOn && !deleteExist) {
            let deleteColumn = {
                field: 'delete',
                headerName: ' ',
                flex: .3,
                renderCell: (params) => renderDeleteButton(params),
                disableClickEventBubbling: true,
                align:"center"
            };
            existingColumns.push(deleteColumn);
        }
        setColumns(existingColumns);
    }

    function editOnClick(row) {
        if (props.editOnClick) {
            props.editOnClick(row);
        }
    }

    const renderEditButton = (params) => {
        return (
            <strong>
                <IconButton onClick={() => { console.log(params.row); editOnClick(params.row); }} color="primary" aria-label="addItem">
                    <EditRoundedIcon />
                </IconButton>
            </strong>
        )
        /* return (
             <strong>
                 <Button
                     variant="contained"
                     color="primary"
                     size="small"
                     style={{ marginLeft: 16 }}
                     onClick={() => {
                         console.log(params.row)
                         editOnClick(params.row);
                     }}
                 >
                     Edit
                 </Button>
             </strong>
         )*/
    }

    const renderDeleteButton = (params) => {
        return (
            <strong>
                <IconButton onClick={() => { console.log(params.row); setSelectedRecord(params.row); setOpenDeleteConfirmation(true); }} color="secondary" aria-label="addItem">
                    <DeleteForeverRoundedIcon />
                </IconButton>
            </strong>
        )
        /*  return (
              <strong>
                  <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ marginLeft: 16 }}
                      onClick={() => {
                          setSelectedRecord(params.row);
                          //setOpenDeleteConfirmation(true);
                          setOpenDeleteConfirmation(true);
                          console.log(params.row)
                      }}
                  >
                      Delete
              </Button>
              </strong>
          )*/
    }

    function addNewOnClick() {
        if (props) {
            props.addOnClick();
        }
    }

    const agreeToDelete = () => {
        handleClose();
        if (props) {
            props.deleteConfirmed(selectedRecord);
        }
    }

    const handleClose = () => {
        setOpenDeleteConfirmation(false);
    }



    const handleEditRowModelChange = React.useCallback((params) => {
        setEditRowsModel(params.model);
        console.log(params.model)
    }, []);


    return (
        <Grid container={true}>
            <Grid item md={12} xs={12}>
                {isLoaded ? (
                    <Card>
                    {addButonOn?(
                        <CardHeader
                            subheader={props.subHeader}
                            title={props.title}
                            action={
                                <IconButton disabled={!addButonOn} onClick={addNewOnClick} color="primary" aria-label="addItem">
                                    <AddCircleIcon />
                                </IconButton>
                            }
                        />):(<CardHeader
                            color ="red"
                            subheader={props.subHeader}
                            title={props.title}
                        />)}
                        <Divider />
                        <CardContent>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ flexGrow: 1 }}>
                                    <DataGrid density="compact" autoHeight rows={allRecords} columns={columns} pageSize={5} onEditRowModelChange={handleEditRowModelChange} />
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                ) : (<CircularProgressComponent />)}
            </Grid>
            <Dialog
                open={openDeleteConfirmation}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete record ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this record ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={agreeToDelete} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
})

TableListView.propTypes = {
    title: PropTypes.string,
    subHeader: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    addButton: PropTypes.bool,
    deleteButton: PropTypes.bool,
    editButton: PropTypes.bool,
    addOnClick: PropTypes.func,
    editOnClick: PropTypes.func,
    deleteConfirmed: PropTypes.func
}

export default TableListView;