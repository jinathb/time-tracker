import React, { useState, useEffect,useRef } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Box } from '@material-ui/core';
import UserService from '../../services/UserService';
import RolesAndPrevilegesService from '../../services/RoleSAndPrivilegesService';
import TransferList from '../utils/TransferList'
import SuccesMessageBox from '../utils/SuccessMessageBox';


export default function UserDetails(props) {
    const [userId, setuserId] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [jobTitle, setjobTitle] = useState("");
    const [jobTitleList, setjobTitleList] = useState([
        { id: "1", title: "Developer" }, 
        { id: "2", title: "Senior Developer" },
        { id: "3", title: "Designer" },
        { id: "4", title: "PM" }]);

    const [allRoles, setallRoles] = useState(["Admin", "Team Lead", "PM"]);
    const [assignedRoles, setassignedRoles] = useState(["User"]);
    const [validationErrors, setvalidationErrors] = useState({})
    const [messageTitle, setmessageTitle] = useState("");
    const [messageToShow, setmessageToShow] = useState("");
    const messageBoxRef = useRef(null);
    const [isLoaded, setisLoaded] = useState(false);

    function getJobTitles() {
        return [
        { id: "1", title: "Developer" }, 
        { id: "2", title: "Senior Developer" },
        { id: "3", title: "Designer" },
        { id: "4", title: "PM" }];
    }

    async function saveUserDetails() {
        if (validateForm()) {
            console.log(userId);
            console.log(assignedRoles);
            const newUser =
            {
                "id": userId,
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                "jobTitle": jobTitle
            }
            if (userId == null) {
                var savedUser = UserService.addUser(newUser);
                setmessageToShow("Successfully added");
                setmessageTitle("Updated");
                messageBoxRef.current.showDialog();
            } else {
                UserService.updateUser(newUser);
                setmessageToShow("Successfully updated");
                setmessageTitle("Updated");
                messageBoxRef.current.showDialog();
            }
        }
    }

    const validateForm = () => {
        let tempError = {};
        tempError.firstName = firstName ? "" : "First Name is required";
        tempError.lastName = lastName ? "" : "Last Name is required";
        const remailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        tempError.email = remailRegx.test(email) ? "" : "Invalid Email address";
        setvalidationErrors(tempError)
        
        return Object.values(tempError).every(x=>x==="");
        
    }


    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    async function setAllRoleNames(){
        let roleNames= await RolesAndPrevilegesService.getAllRoleNames();
        console.log(roleNames);
        setallRoles(not(roleNames,assignedRoles));
        setisLoaded(true);
    }

    useEffect(() => {
        console.log(props);
        if (props.userDetail) {
            const { firstName, lastName, email, phone, id,jobTitle } = props.userDetail;
            setuserId(id);
            setFirstName(firstName);
            setlastName(lastName);
            setEmail(email);
            setPhone(phone);
            setjobTitle(jobTitle);
        } else {
            setjobTitleList(getJobTitles());
        }
        setAllRoleNames();
        
        return () => {
            setisLoaded(false);
        }
    }, []);




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
                                    label="First name"
                                    name="firstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    value={firstName}
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
                                    label="Last name"
                                    name="lastName"
                                    onChange={(e) => setlastName(e.target.value)}
                                    required
                                    value={lastName}
                                    variant="outlined"
                                    {...(validationErrors.lastName && { error: true, helperText: validationErrors.lastName })}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    value={email}
                                    variant="outlined"
                                    {...(validationErrors.email && { error: true, helperText: validationErrors.email })}
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Select Job Title"
                                    name="jobTitle"
                                    onChange={(e) => setjobTitle(e.target.value)} J
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={jobTitle}
                                    variant="outlined"
                                >
                                    {jobTitleList.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.title}
                                        >
                                            {option.title}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid>
                                <TransferList
                                    left leftList={allRoles}
                                    rightList={assignedRoles}
                                    leftTitle="Roles"
                                    rightTitle="Assigned"
                                    setRightList={setassignedRoles}
                                    setLeftList={setallRoles} />
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
                </form>) : (<div>Loading...</div>)}
            <SuccesMessageBox ref={messageBoxRef} title={messageTitle} message={messageToShow} />
        </div>
    )
}
