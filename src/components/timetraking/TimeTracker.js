import React, { useEffect, useState, useRef } from 'react';
import { Grid, Card, CardContent, Box, TextField, Checkbox, IconButton, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ProjectService from '../../services/ProjectService'
import TaskService from '../../services/TaskService'
import CircularProgressComponent from '../utils/CircularProgressComponent';
import TimeTrackerRecordList from './TimeTrackRecordList';
import TimeTrackerService from '../../services/TimeTrackerService';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const LOCAL_STORAGE_TIME_RECORD_KEY = 'sample.app.timeReord';

function Timetracker() {
    const [projectList, setprojectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [taskList, setTaskList] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [timeRecordList, setTimeRecordList] = useState([]);
    const [runingEvent, setRuningEvent] = useState(null);
    // var openEvent = {};
    var timeRecord = null;

    function validateTimeRecord() {

        let tempError = {};
        console.log("------------------------------------" + selectedProject);
        tempError.project = selectedProject ? "" : "Project  is required";
        tempError.task = selectedTask ? "" : "Task is required";
        tempError.tag = selectedTags.length !== 0 ? "" : "Tag is required";
        tempError.description = taskDescription ? "" : "Description is required";

        setValidationErrors(tempError)
        return Object.values(tempError).every(x => x === "");
    }

    const getAllProjects = async () => {
        let response = await ProjectService.getAllProjects();
        if (response && !response.error) {
            setprojectList(response.data)
        }
    }

    const getAllTasks = async () => {
        let response = await TaskService.getAllTasks();
        if (response && !response.error) {
            setTaskList(response.data)
        }
    }

    async function loadTimeEvents() {
        let response = await TimeTrackerService.getAllEvents();
        if (response && !response.error) {
            setTimeRecordList(response.data);
        }
    }

    async function loadOpenTimeEvents() {
        let response = await TimeTrackerService.getOpenEvent();
        if (response && !response.error) {
            let openEvent = response.data[0];
            console.log(openEvent);
            setRuningEvent((preveEvent) => { return openEvent; });
            console.log(openEvent);
        }
    }

    const loadAllData = () => {
        setTimeRecordList([]);
        let projectPromise = getAllProjects();
        let taskPromise = getAllTasks();
        let eventPromise = loadTimeEvents();
        let openEventPromise = loadOpenTimeEvents();

        Promise.all([projectPromise, taskPromise, openEventPromise, eventPromise]).then(e => finaliseLoading())
            .catch(error => console.log("Error in data loading" + error));
    }

    useEffect(() => {
        handleOpenRecord();
        return () => {

        }
    }, [runingEvent])

    function finaliseLoading() {

        setIsLoaded(true);
    }

    function handleOpenRecord() {
        console.log("--------------handle open record-------------:" + runingEvent);
        if (runingEvent) {
            let openEvent = runingEvent;
            setSelectedProject(openEvent.project);
            setSelectedTask(openEvent.task);
            setSelectedTags(openEvent.tag);
            setTaskDescription(openEvent.description);
            var startTime = new Date(openEvent.startTime);
            var seconds = (new Date().getTime() - startTime.getTime()) / 1000;
            seconds = Math.ceil(seconds);
            startTimer(seconds);
        }
    }

    useEffect(() => {
        loadAllData();
        return () => {

        }
    }, [])

    /*  useEffect(() => {
          if (timerStart) {
              timerOn();
          } else {
              timerOff();
          }
          return () => {
  
          }
      }, [timerStart])*/

    function createTimeRecord() {
        timeRecord = {
            id: "",
            userId: "",
            project: selectedProject,
            task: selectedTask,
            description: taskDescription,
            tag: selectedTags,
            startTime: new Date(),
            endTime: "",
            status: "OPEN",
        }
        TimeTrackerService.saveEvent(timeRecord);

        localStorage.setItem(LOCAL_STORAGE_TIME_RECORD_KEY, JSON.stringify(timeRecord));
    }

    function saveTimeRecord() {

        TimeTrackerService.getOpenEvent().then(
            (response) => {
                
                console.log("***************************************************");
                console.log("***************************************************");
                console.log(response);
                
                if (!response.error) {
                    let openEvent = response.data[0];
                    openEvent.status = "CLOSE";



                    openEvent.dateKey = getDateToNuber(new Date(openEvent.startTime));
                    openEvent.endTime = new Date();
                    openEvent.start = getTime(new Date(openEvent.startTime));
                    openEvent.end = getTime(openEvent.endTime);


                    let durationMin = (openEvent.endTime.getTime() - new Date(openEvent.startTime).getTime()) / 60000;
                    durationMin=Math.ceil(durationMin);
                    openEvent.duration=durationMin;
                    let timeRecords = timeRecordList;
                    timeRecords.push(openEvent);
                    setTimeRecordList(timeRecords);
                    TimeTrackerService.updateEvent(openEvent.id, openEvent);
                    setRuningEvent(null);
                    setTimer(0);
                    
                }
            }


        );

    }

    function saveTimeRecord1() {
        let strTimeRecord = localStorage.getItem(LOCAL_STORAGE_TIME_RECORD_KEY);
        if (strTimeRecord) {

            timeRecord = JSON.parse(strTimeRecord)
            timeRecord.endTime = new Date();
            let startTime = new Date(timeRecord.startTime);
            timeRecord.startTime = startTime;
            timeRecord.dateKey = getDateToNuber(startTime);
            timeRecord.id = getDateTimeToNumber(startTime);
            var seconds = (timeRecord.endTime.getTime() - startTime.getTime()) / 1000;

            timeRecord.start = getTime(startTime);
            timeRecord.end = getTime(timeRecord.endTime);

            let timeRecords = timeRecordList;
            timeRecords.push(timeRecord);
            setTimeRecordList(timeRecords);


            console.log(timeRecord);
            console.log(timeRecordList);
            setTimer(0);
            localStorage.removeItem(LOCAL_STORAGE_TIME_RECORD_KEY);
        }
    }

    function getDateToNuber(dateParam) {
        let strDate = [dateParam.getFullYear(), ("0" + (dateParam.getMonth() + 1)).slice(-2), ("0" + (dateParam.getDate())).slice(-2)].join("");
        return strDate
    }

    function getDateTimeToNumber(dateParam) {
        let strDate = [
            dateParam.getFullYear(),
            ("0" + (dateParam.getMonth() + 1)).slice(-2),
            ("0" + (dateParam.getDate())).slice(-2),
            dateParam.getHours(),
            dateParam.getMinutes(),
            dateParam.getSeconds()
        ].join("");
        return strDate
    }

    function getTime(dateParam) {
        return (dateParam.getHours() + ":" + dateParam.getMinutes());
    }

    function startTimer(initiaValue) {
        if (initiaValue) {
            console.log("******************************: " + Number(initiaValue));
            setTimer((timer) => timer + initiaValue);
        }
        setTimerStart(true);
        countRef.current = setInterval(updateTimer, 1000);
    }

    const timerOn = () => {
        if (validateTimeRecord()) {
            createTimeRecord();
            startTimer();

        } else {
            setTimerStart(false);
        }
    }

    const timerOff = () => {
        if (countRef) {
            clearInterval(countRef.current);
            saveTimeRecord();
            setTimerStart(false);
        }
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
        <>
            {isLoaded ? (
                <Grid container={true} spacing={3}>
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
                                            getOptionLabel={(option) => option.projectName}
                                            onChange={(event, newValue) => {

                                                setSelectedProject(newValue);
                                            }}
                                            renderInput={(params) => <TextField
                                                {...params}
                                                label="Project"
                                                {...(validationErrors.project && { error: true, helperText: validationErrors.project })}
                                            />}

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
                                            renderInput={(params) => <TextField
                                                {...params}
                                                label="Task"
                                                {...(validationErrors.task && { error: true, helperText: validationErrors.task })}
                                            />}
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
                                            {...(validationErrors.description && { error: true, helperText: validationErrors.description })}

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
                                                    {...(validationErrors.tag && { error: true, helperText: validationErrors.tag })}
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
                                                    <IconButton color="secondary" onClick={(e) => timerOff()} aria-label="upload picture" component="span">
                                                        <StopIcon fontSize="large" />
                                                    </IconButton>
                                                ) :
                                                (
                                                    <IconButton color="primary" aria-label="upload picture" onClick={(e) => timerOn()} component="span">
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
                    <Grid item md={12} xs={12}>
                        <TimeTrackerRecordList timeRecordList={timeRecordList}></TimeTrackerRecordList>
                    </Grid>
                </Grid>
            ) : (<CircularProgressComponent showProgress={!isLoaded} />)
            }
        </>
    )





}

export default Timetracker
