import React, { useState, useEffect, useRef } from 'react';
import { Grid, Card, CardContent, CardHeader, Divider, Button, TextField, CardActions } from '@material-ui/core';
import TaskService from '../../services/TaskService';
import SuccesMessageBox from '../utils/SuccessMessageBox';
import TransferList from '../utils/TransferList';
import PropTypes from 'prop-types'
import ProjectService from '../../services/ProjectService';

function Project(props) {

    const [projectId, setProjectId] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [client, setClient] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [messageTitle, setmessageTitle] = useState("");
    const [messageToShow, setmessageToShow] = useState("");
    const messageBoxRef = useRef(null);
    const [allTasks, setallTasks] = useState([]);
    const [assignedTasks, setAssignedTasks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);

    async function loadTasks() {
        let taskNames = await TaskService.getAllTaskNames();
        setallTasks(taskNames);
        setIsLoaded(true);
    }


    useEffect(() => {
        
        if (props.location.state) {
            let projectDetails = props.location.state.projectDetails;
            if(projectDetails){
                setProjectId(projectDetails.id);
                setProjectName(projectDetails.projectName);
                setProjectDescription(projectDetails.description);
                setClient(projectDetails.client);
            }
        }
        return () => {
            
        }
    }, [props])

    useEffect(() => {
        loadTasks();
        return () => {
            return setIsLoaded(false);
        }
    }, []);

    function validateForm() {
        let tempErros = {};
        tempErros.projectName = projectName ? "" : "Project Name isRequired";
        tempErros.projectDescription = projectDescription ? "" : "Project Description isRequired";
        tempErros.client = client ? "" : "Client name isRequired";
        console.log(tempErros);
        setValidationErrors(tempErros);
        return Object.values(tempErros).every(x => x === "");

    }
    async function saveProject() {

        if (validateForm()) {
            console.log("valid");
            let newProject = {
                "id": projectId,
                "projectName": projectName,
                "description": projectDescription,
                "client": client
            }
            if (projectId == null) {
                let response = await ProjectService.saveProject(newProject);
                if (!response.error) {
                    setmessageToShow("Successfully added");
                    setmessageTitle("Updated");
                    messageBoxRef.current.showDialog();
                }
            } else {
                let response = await ProjectService.updateProject(projectId, newProject);
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

    function getUnAssignedTasks() {
        return not(allTasks, assignedTasks);
    }

    return (
        <>
            {isLoaded ? (
                <Grid container={true}>
                    <Grid item md={1} xs={1}></Grid>
                    <Grid item md={10} xs={10}>
                        <form
                            autoComplete="off"
                            noValidate
                        >
                            <Card>
                                <CardHeader
                                    subheader="The information can be edited"
                                    title="Project Details"
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
                                                helperText="Please specify the project name"
                                                label="Project Name"
                                                name="projectName"
                                                onChange={(e) => setProjectName(e.target.value)}
                                                required
                                                value={projectName}
                                                variant="outlined"
                                                {...(validationErrors.projectName && { error: true, helperText: validationErrors.projectName })}

                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Project Description"
                                                name="projectDescription"
                                                onChange={(e) => setProjectDescription(e.target.value)}
                                                required
                                                value={projectDescription}
                                                variant="outlined"
                                                {...(validationErrors.projectDescription && { error: true, helperText: validationErrors.projectDescription })}
                                            />
                                        </Grid>
                                    </Grid>

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
                                                helperText="Please specify the client name"
                                                label="Client"
                                                name="client"
                                                onChange={(e) => setClient(e.target.value)}
                                                required
                                                value={client}
                                                variant="outlined"
                                                {...(validationErrors.client && { error: true, helperText: validationErrors.client })}

                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            item
                                            xs={12}
                                        >
                                            <TransferList
                                                leftList={getUnAssignedTasks}
                                                rightList={assignedTasks}
                                                leftTitle="Tasks"
                                                rightTitle="Assigned"
                                                setRightList={setAssignedTasks}
                                                setLeftList={setallTasks} />
                                        </Grid>
                                    </Grid>

                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button
                                        style={{ marginLeft: "auto" }}
                                        color="primary"
                                        variant="contained"
                                        onClick={saveProject}
                                    >
                                        Save details
                            </Button>
                                </CardActions>
                            </Card>
                        </form>
                    </Grid>
                    <Grid item md={1} xs={1}></Grid>
                    <SuccesMessageBox ref={messageBoxRef} title={messageTitle} message={messageToShow} />
                </Grid>
            ) : (<div></div>)}
        </>
    )
}

Project.propTypes = {

}

export default Project

