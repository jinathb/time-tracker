import React, { useEffect, useState, useRef } from 'react';
import { Grid, Card, CardContent, Box, TextField, Checkbox, IconButton, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function TimetrackerStartBar() {
    const [projectList, setprojectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState({});
    const [taskList, setTaskList] = useState([
        {
            "id": 1,
            "taskName": "Architecture and Design",
            "description": "Architecture and Design"
        },
        {
            "id": 2,
            "taskName": "Communications (Client / internal, Calls, Mail)",
            "description": "Communications (Client / internal, Calls, Mail)"
        },
        {
            "id": 3,
            "taskName": "Development",
            "description": "Development"
        },
        {
            "id": 4,
            "taskName": "Estimation",
            "description": "Estimation"
        },
    ])

    const [selectedTask, setSelectedTask] = useState({});

    const [tagList, setTagList] = useState([
        { id: "1", tagName: "HR" },
        { id: "2", tagName: "Finance" },
        { id: "3", tagName: "Delivary" },
        { id: "4", tagName: "Marketing" }]);

    const [selectedTags, setSelectedTags] = useState([]);
    const [taskDescription, setTaskDescription] = useState("");
    const [billabale, setBillabale] = useState(false);
    const [timerStart, setTimerStart] = useState(false);
    const [timer, setTimer] = useState(0);
    const countRef = useRef(null)

    useEffect(() => {
        if (timerStart) {
            timerOn();
        } else {
            timerOff();
        }
        return () => {

        }
    }, [timerStart])


    const timerOff = () => {
        if (countRef) {
            clearInterval(countRef.current);
        }
    }

    const timerOn = () => {
        countRef.current = setInterval(updateTimer, 1000);
    }

    const updateTimer = () => {
        setTimer((timer) => timer + 1)
        console.log(timer);
    }

    const getFormatedTime = (timer) => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`;

    }

    return (
        <Grid container={true}>

            <Grid item md={12} xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={2} xs={12}>
                                <Autocomplete
                                    size="small"
                                    id="projectsAutocomplete"
                                    autoHighlight
                                    options={projectList}
                                    value={selectedProject}
                                    getOptionLabel={(option) => option & option.projectName ? option.projectName : ""}
                                    onChange={(event, newValue) => {

                                        setSelectedProject(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Project" />}
                                />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <Autocomplete
                                    size="small"
                                    id="tasksAutocomplete"
                                    required
                                    options={taskList}
                                    autoHighlight
                                    value={selectedTask}
                                    onChange={(event, newValue) => {
                                        setSelectedTask(newValue);
                                    }}
                                    getOptionLabel={(option) => option.taskName}
                                    renderInput={(params) => <TextField {...params} label="Task" />}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="taskDescription"

                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    required
                                    value={taskDescription}


                                />
                            </Grid>

                            <Grid item md={2} xs={12}>

                                <Autocomplete
                                    multiple
                                    size="small"
                                    limitTags={1}
                                    id="tagAutocomplete"
                                    options={tagList}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.tagName}
                                    onChange={(event, newValue) => {
                                        setSelectedTags(newValue);
                                    }}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {option.tagName}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tags"
                                        />
                                    )}
                                />


                            </Grid>



                            <Grid item md={1} xs={12}>
                                <Box justifyContent="center" display="flex" >
                                    {billabale ?
                                        (
                                            <IconButton color="primary" onClick={(e) => setBillabale(false)} aria-label="upload picture" component="span">
                                                <AttachMoneyIcon fontSize="large" />
                                            </IconButton>
                                        ) :
                                        (
                                            <IconButton aria-label="upload picture" onClick={(e) => setBillabale(true)} component="span">
                                                <AttachMoneyIcon fontSize="large" />
                                            </IconButton>
                                        )
                                    }
                                </Box>
                            </Grid>

                            <Grid item md={1} xs={12}>
                                <Box justifyContent="center" display="flex" marginTop={2}>
                                    <Typography style={{ fontSize: "16px", fontWeight: "bold" }} >{getFormatedTime(timer)}</Typography>
                                </Box>

                            </Grid>

                            <Grid item md={1} xs={12}>
                                <Box justifyContent="center" display="flex" >
                                    {timerStart ?
                                        (
                                            <IconButton color="secondary" onClick={(e) => setTimerStart(false)} aria-label="upload picture" component="span">
                                                <StopIcon fontSize="large" />
                                            </IconButton>
                                        ) :
                                        (
                                            <IconButton color="primary" aria-label="upload picture" onClick={(e) => setTimerStart(true)} component="span">
                                                <PlayCircleFilledIcon fontSize="large" />
                                            </IconButton>
                                        )
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )





}

export default TimetrackerStartBar
