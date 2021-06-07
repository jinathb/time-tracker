import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardContent, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core/";
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function UserListTemp() {
 const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    const [rowData, setRowData] = useState([]);

    const [open, setOpen] = useState(false);

    var selectedUser={};

    /* useEffect(() => {
 
         const axios = require('axios').default;
 
         axios
 
             .get('http://localhost:3000/users')
 
             .then((response) => {
 
                 setIsLoaded(true);
 
                 console.log(response.data);
 
                 setRowData(response.data);
 
                 response.data.forEach(user => {
 
                 });
 
             });
 
     }, []);*/


    useEffect(() => {
        async function getAllUsers() {
            const users = await UserService.getUserList();
            console.log(users);
            setIsLoaded(true);
            setRowData(users);
        }
        getAllUsers();
    }, [])


    const renderEditButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                       history.push({ pathname: '/user-details', state: { userDetail: params.row } });
                        console.log(params.row.firstName)
                        console.log(params.row)
                    }}
                >
                    Edit
            </Button>
            </strong>
        )
    }

    const renderDeleteButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                       // setSelectedUser(params.row);
                        //setOpen(true);
                        console.log(params.row.firstName)
                        console.log(params.row)
                    }}
                >
                    Delete
            </Button>
            </strong>
        )
    }

    const handleClose = () => {
        setOpen(false);
    }

    const agreeToDelete = () => {
        handleClose();
    }

    const disagreeToDelete = () => {
        handleClose();
    }


    const columns = [
        { field: "id", headerName: "ID", width: 100, type: "number" },
        { field: "firstName", headerName: "First name", width: 250 },
        { field: "lastName", headerName: "Last name", width: 250 },
        { field: "email", headerName: "E-Mail", type: "email", width: 250 },
        { field: "phone", headerName: "Phone", type: "text", width: 140 },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params) => renderEditButton(params),
            disableClickEventBubbling: true,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 150,
            renderCell: (params) => renderDeleteButton(params),
            disableClickEventBubbling: true,
        },
    ];

    return (

        <div style={{ height: 400, width: '100%' }}>
        <Card>
            <CardHeader
                subheader=""
                title="User Detais"
                action={
                    <IconButton onClick={() => { history.push({ pathname: '/user-details' });  }} color="primary" aria-label="settings">
                        <AddCircleIcon />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid autoHeight rows={rowData} columns={columns} pageSize={5} />
                    </div>
                </div>

            </CardContent>
        </Card>


        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete user ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {selectedUser.firstName} {selectedUser.lastName} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={disagreeToDelete} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={agreeToDelete} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </div>

    );

}