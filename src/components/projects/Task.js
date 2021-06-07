import React, { useState, useEffect, useRef } from 'react';
import { Grid, Card, CardContent, CardHeader, Divider, Button, TextField, CardActions } from '@material-ui/core';
import TaskService from '../../services/TaskService';
import SuccesMessageBox from '../utils/SuccessMessageBox';


function Task(props) {
    const [taskId, setTaskId] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [messageTitle, setmessageTitle] = useState("");
    const [messageToShow, setmessageToShow] = useState("");
    const messageBoxRef = useRef(null);


    useEffect(() => {
        
        if (props.location.state) {
            let taskDetails = props.location.state.task;
            if(taskDetails){
                setTaskId(taskDetails.id);
                setTaskName(taskDetails.taskName);
                setTaskDescription(taskDetails.description);
            }
        }
        return () => {
            
        }
    }, [props])

    const validateForm = () => {
        let tempErros = {};
        tempErros.taskName = taskName ? "" : "Task name isRequired";
        tempErros.taskDescription = taskDescription ? "" : "Task name isRequired";
        console.log(tempErros);
        setValidationErrors(tempErros);
        return Object.values(tempErros).every(x => x === "");
    }

    const saveTask = async () => {
        if (validateForm()) {
            console.log("valid");
            let newTask = {
                "taskId": taskId,
                "taskName": taskName,
                "description": taskDescription
            }
            if (taskId == null) {
                let response = await TaskService.saveTask(newTask);
                if (!response.error) {
                    setmessageToShow("Successfully added");
                    setmessageTitle("Updated");
                    messageBoxRef.current.showDialog();
                }
            } else {
                TaskService.updateTask(taskId, newTask);
                setmessageToShow("Successfully updated");
                    setmessageTitle("Updated");
                    messageBoxRef.current.showDialog();
            }
        }
    }

    return (

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
                            title="Task Detail"
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
                                        helperText="Please specify the task name"
                                        label="Task Name"
                                        name="taskName"
                                        onChange={(e) => setTaskName(e.target.value)}
                                        required
                                        value={taskName}
                                        variant="outlined"
                                        {...(validationErrors.taskName && { error: true, helperText: validationErrors.taskName })}

                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Task Description"
                                        name="taskDescription"
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        required
                                        value={taskDescription}
                                        variant="outlined"
                                        {...(validationErrors.taskDescription && { error: true, helperText: validationErrors.taskDescription })}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                style={{ marginLeft: "auto" }}
                                color="primary"
                                variant="contained"
                                onClick={saveTask}
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
    )
}

export default Task
