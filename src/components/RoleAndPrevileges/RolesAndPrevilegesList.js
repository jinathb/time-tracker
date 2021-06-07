import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader, CardContent, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core/";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import RolesAndPrevilegesService from '../../services/RoleSAndPrivilegesService'
import CircularProgressComponent from '../utils/CircularProgressComponent'


export default function RolesAndPrevilegesList() {
    const history = useHistory();
    const [allRoles, setallRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRole, setselectedRole] = useState({});
    const [isLoaded, setisLoaded] = useState(false);

    async function getAllRoles() {
        const response = await RolesAndPrevilegesService.getAllRoles();
        if (response && !response.error) {
            let roles = response.data;
            setallRoles(roles);
            setisLoaded(true);
            console.log(roles);
        }
    }

    useEffect(() => {
        getAllRoles();
        return () => {
            setisLoaded(false);
        }
    }, []);

    const renderEditButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                        console.log(params.row)
                        history.push({  pathname: '/roles-details', state: { roleDetails: params.row } });
                        
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
                        setselectedRole(params.row);
                        setOpen(true);
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
        let response= RolesAndPrevilegesService.deleteRole(selectedRole.id);
        if(response.error){
            console.error(response.error);
        }else{
            setisLoaded(false);
            console.log(response.data);
            getAllRoles();
        }
        handleClose();
    }

    const disagreeToDelete = () => {
        handleClose();
    }

    const columns = [
        { field: "id", headerName: "ID", width: 100, type: "number" },
        { field: "roleName", headerName: "Role Name", width: 250 },
        { field: "description", headerName: "Description", width: 250 },
        { field: "previleges", headerName: "Previleges", width: 400 },
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
            {isLoaded ? (
                <Card>
                    <CardHeader
                        subheader=""
                        title="User Roles"
                        action={
                            <IconButton onClick={() => { history.push({ pathname: '/roles-details' }); }} color="primary" aria-label="settings">
                                <AddCircleIcon />
                            </IconButton>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <div style={{ display: 'flex', height: '100%' }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGrid autoHeight rows={allRoles} columns={columns} pageSize={5} />
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
                        Are you sure you want to delete Role {selectedRole.roleName}  ?
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
    )
}
