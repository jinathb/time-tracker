import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardContent, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core/";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import UserService from '../../services/UserService'
import CircularProgressComponent from '../utils/CircularProgressComponent'



export default function UserList() {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [allUsers, setallUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);


    async function getAllUsers() {
        const users = await UserService.getUserList();
        console.log(users);
        setIsLoaded(true);
        setallUsers(users);
    }

    useEffect(() => {
        
        getAllUsers();
        return () => {
            setIsLoaded(false);
        }
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
                        setSelectedUser(params.row);
                        setOpen(true);
                        console.log(params.row.firstName)
                        console.log(params.row)
                    }}
                >
                    Delete
            </Button>
            </strong>
        )
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

    /*const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", email: "Jon@abc.com", phone: "312323123" },
        { id: 2, lastName: "Lannister", firstName: "Cersei", email: "Cersei@abc.com", phone: "76443524234" },
        { id: 3, lastName: "Lannister", firstName: "Jaime", email: "Jaime@abc.com", phone: "245523454545" },
        { id: 4, lastName: "Stark", firstName: "Arya", email: "Arya@abc.com", phone: "993243423424" },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", email: "Daenerys@abc.com", phone: "5334534545" },
        { id: 6, lastName: "Melisandre", firstName: "Smith", email: "Smith@abc.com", phone: "6546565463" },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", email: "Ferrara@abc.com", phone: "645345435" },
        { id: 8, lastName: "Frances", firstName: "Rossini", email: "Rossini@abc.com", phone: "45454542324" },
        { id: 9, lastName: "Roxie", firstName: "Harvey", email: "Harvey@abc.com", phone: "854745535" }
    ];*/

    const handleClose = () => {
        setOpen(false);
    }

    const agreeToDelete = () => {
        UserService.deleteUser(selectedUser);
        setIsLoaded(false);
        getAllUsers();
        handleClose();
    }

    const disagreeToDelete = () => {
        handleClose();
    }

    return (

        <div style={{ height: 400, width: '100%' }}>
            {isLoaded ? (
                <Card>
                    <CardHeader
                        subheader=""
                        title="User Details"
                        action={
                            <IconButton onClick={() => { history.push({ pathname: '/user-details' }); }} color="primary" aria-label="settings">
                                <AddCircleIcon />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <div style={{ display: 'flex', height: '100%' }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid autoHeight rows={allUsers} columns={columns} pageSize={5} />
                            </div>
                        </div>

                    </CardContent>
                </Card>
            ) : (<CircularProgressComponent showProgress={!isLoaded}/>)}
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

