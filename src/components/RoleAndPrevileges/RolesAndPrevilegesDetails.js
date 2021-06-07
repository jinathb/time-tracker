import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Box } from '@material-ui/core';


export default function RolesAndPrevilegesDetails() {

    const [roleName, setroleName] = useState("");
    const [roleDescription, setroleDescription] = useState("");
    const [allPrevileges, setallPrevileges] = useState([]);
    const [assignedPrevileges, setassignedPrevileges] = useState([]);
    const [validationErrors, setvalidationErrors] = useState({});

    return (
        <div>
            <form
                autoComplete="off"
                noValidate
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="User Details"
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
                                    {...(validationErrors.firstName && { error: true, helperText: validationErrors.firstName })}

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
                                    {...(validationErrors.lastName && { error: true, helperText: validationErrors.lastName })}
                                />
                            </Grid>
                            <Grid>
                                <TransferList
                                    left leftList={allPrevileges}
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
                            onClick={saveUserDetails}
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        </div>
    )
}


