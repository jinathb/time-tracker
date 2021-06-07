import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Box } from '@material-ui/core';
import TransferList from '../utils/TransferList';
import RolesAndPrevilegesService from '../../services/RoleSAndPrivilegesService';
import SuccesMessageBox from '../utils/SuccessMessageBox';

function RolesAndPrevileges(props) {
    let roleDetails = null;
    if (props.location.state) {
        roleDetails = props.location.state.roleDetails;
    }
    const [roleId, setroleId] = useState(null);
    const [roleName, setroleName] = useState("");
    const [roleDescription, setroleDescription] = useState("");
    const [allPrevileges, setallPrevileges] = useState([]);
    const [assignedPrevileges, setassignedPrevileges] = useState([]);
    const [validationErrors, setvalidationErrors] = useState({});
    const [isLoaded, setisLoaded] = useState(false)
    const [messageTitle, setmessageTitle] = useState("");
    const [messageToShow, setmessageToShow] = useState("");
    const messageBoxRef = useRef(null);


    useEffect(() => {
        if (roleDetails !== null) {
            setroleId(roleDetails.id);
            setroleName(roleDetails.roleName);
            setroleDescription(roleDetails.description)
            console.log(roleDetails.previleges);
            setassignedPrevileges(roleDetails.previleges)
        }
    }, [roleDetails])

    useEffect(() => {
        async function getAllUsers() {
            let previlegeCodes = await RolesAndPrevilegesService.getAllPrevilegesCodes();
            setallPrevileges(previlegeCodes);
            setisLoaded(true);
        }
        getAllUsers();
        return () => {
            setisLoaded(false);
        }
    }, []);


    const validateForm = () => {
        let tempError = {};
        tempError.roleName = roleName ? "" : "Role Name is required";
        tempError.roleDescription = roleDescription ? "" : "Role Description is required";
       
        setvalidationErrors(tempError)
        return Object.values(tempError).every(x=>x==="");
    }

    async function SaveRoleDetails() {
        if (validateForm()) {
            let newRole = {
                "roleId": roleId,
                "roleName": roleName,
                "description": roleDescription,
                "previleges": assignedPrevileges
            }
            if (roleId === null) {
                let response = await RolesAndPrevilegesService.saveRoles(newRole);
                if (!response.error) {
                    setmessageToShow("Successfully added");
                    setmessageTitle("Updated");
                    messageBoxRef.current.showDialog();
                }
            } else {
                let response = await RolesAndPrevilegesService.updateRoles(newRole, roleId);
                if (!response.error) {
                    setmessageToShow("Successfully updated");
                    setmessageTitle("Updated");
                    messageBoxRef.current.showDialog();
                }
            }
        }
    }



    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function getUnAssignedRoles() {
        return not(allPrevileges, assignedPrevileges);
    }

    return (
        <div>
            {isLoaded ? (
                <form
                    autoComplete="off"
                    noValidate
                >
                    <Card>
                        <CardHeader
                            subheader="The information can be edited"
                            title="Role and Previleges Details"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the first name"
                                        label="Role name"
                                        name="roleName"
                                        onChange={(e) => setroleName(e.target.value)}
                                        required
                                        value={roleName}
                                        variant="outlined"
                                        {...(validationErrors.roleName && { error: true, helperText: validationErrors.roleName })}

                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Role Description"
                                        name="roleDescription"
                                        onChange={(e) => setroleDescription(e.target.value)}
                                        required
                                        value={roleDescription}
                                        variant="outlined"
                                        {...(validationErrors.roleDescription && { error: true, helperText: validationErrors.roleDescription })}
                                    />
                                </Grid>
                                <Grid >
                                    <TransferList
                                        leftList={getUnAssignedRoles}
                                        rightList={assignedPrevileges}
                                        leftTitle="previlages"
                                        rightTitle="Assigned"
                                        setRightList={setassignedPrevileges}
                                        setLeftList={setallPrevileges} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            display="flex" flexDirection="row-reverse" padding="15px"
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={SaveRoleDetails}
                            >
                                Save details
                        </Button>
                        </Box>
                    </Card>
                </form>) : (<div>Loading...</div>)}
            <SuccesMessageBox ref={messageBoxRef} title={messageTitle} message={messageToShow} />
        </div>

    )
}



export default RolesAndPrevileges

