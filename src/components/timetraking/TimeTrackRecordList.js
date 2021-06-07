import React, { useState, useEffect, useRef } from 'react'
import { Grid, Card, CardContent, CardHeader, Divider, Button, TextField, CardActions } from '@material-ui/core';
import PropTypes from 'prop-types'
import { Autocomplete } from '@material-ui/lab';
import TableListView from '../utils/TableListView';
import ProjectService from '../../services/ProjectService';
import TimeRecord from './TimeRecord';


function TimeTrackRecordList(props) {

    const [timeRecords, setTimeRecords] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
    const timeEventEditor = useRef(null);

    useEffect(() => {
        console.log("----------------------------props changed---------------------------");
        if (props.timeRecordList && props.timeRecordList.length > 0) {
            setTimeRecords(makeRecordList(props.timeRecordList));
            setIsLoaded(true);
        }

        return () => {

        }
    }, [props])


    function makeRecordList(recordList) {
        recordList.sort((a, b) => b.dateKey.localeCompare(a.dateKey))
        let prevDate = 0;
        let recordSubList = null;
        let formatedEventList = [];
        const options = { month: "long", day: "numeric", year: "numeric" };
        let formater = new Intl.DateTimeFormat("en-US", options);
        let totalMin = 0;
        recordList.map(record => {

            if (record.dateKey !== prevDate) {
                totalMin = record.duration;
                recordSubList = [];
                recordSubList.push(record);
                let stDate = new Date(record.startTime);
                let displayDate = formater.format(stDate);
                console.log("-------------" + displayDate);
                let dateObj = {
                    eventDate: displayDate,
                    duration: totalMin,
                    eventList: recordSubList
                }
                formatedEventList.push(dateObj);
            } else {
                recordSubList.push(record);
                totalMin += record.duration;
            }
            prevDate = record.dateKey;
        })
        return formatedEventList;
    }

    const projectsdet = [
        {
            "id": 1,
            "projectName": "Evinta QR",
            "description": "Evinta QR Description",
            "client": "Test Client"
        },
        {
            "id": 2,
            "projectName": "Evinta WnB",
            "description": "Evinta WnB Description",
            "client": "Test Client 2"
        },
        {
            "id": 3,
            "projectName": "Evinta KQ",
            "description": "Evinta KQ Description",
            "client": "Test Client 3"
        },
        {
            "id": 4,
            "projectName": "Evinta Lido",
            "description": "Evinta Lido Description",
            "client": "Test Client 4"
        }
    ];

    function renderProjectEditInputCell(props) {
        const { id, value, api, field,row,params } = props;
        console.log(props);
        console.log(row);
        console.log("--------------------------------");
        console.log(params);
        //params.row.project
        const handleChange = (event,newValue) => {
            console.log("--------------------------------");
            console.log(newValue);
            const editProps = {
                value:newValue
            };
        
            api.commitCellChange({ id, field, props: editProps });
            api.setCellMode(id, field, 'view');
          };
        return (
            <Autocomplete
                id="combo-box-demo"
                options={projectsdet}
                getOptionLabel={(option) => option.projectName}
                style={{ width: 300 }}
                onChange={(event, newValue) => {
                    handleChange(event,newValue);
                                            }}
                renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
            />
        );
    }

    const columns = [
        { field: "id", headerName: "Id", flex: 1, type: "number", hide: true },
        { field: "dateKey", headerName: "Date", flex: 1, type: "number", hide: true },
        { field: "project", headerName: "Project Name", flex: 1.5, valueGetter: (params) => { return params.row.project.projectName },editable: true,renderEditCell: renderProjectEditInputCell},
        { field: "description", headerName: "Description", flex: 2, editable: true },
        { field: "task", headerName: "Task", flex: 2, valueGetter: (params) => { return params.row.task.taskName } },
        { field: "tags", headerName: "Tags", flex: 1.5, valueGetter: (params) => { let tags = params.row.tag; let tagNames = []; tags.map((tag) => tagNames.push(tag.tagName)); return tagNames.join(",") } },
        { field: "start", headerName: "Start", flex: .8 },
        { field: "end", headerName: "End", flex: .75 },
        { field: "duration", headerName: "Duration", type: "number", flex: 1 },

    ];



    function addRecord(params) {

    }

    function editRecord(record) {
        console.log("on edit-----------------------");
        console.log(record);

        timeEventEditor.current.showDialog();
    }

    function deleteRecord(record) {
        console.log("on delete---------------");
        console.log(record);
        alert("delete call");
    }

    console.log("---------------------------------------------------------");
    console.log(columns);
    console.log("---------------------------------------------------------");
    return (
        <>

            {isLoaded && timeRecords ? (

                <>
                    <Grid container={true} spacing={3}>

                        {
                            timeRecords.map((timeRecord =>
                                <Grid item xs={12} md={12} key={timeRecord.eventDate}>
                                    <TableListView

                                        title={timeRecord.eventDate}
                                        columns={columns}
                                        rows={timeRecord.eventList}
                                        addButton={false}
                                        deleteButton={true}
                                        editButton={false}
                                        addOnClick={addRecord}
                                        editOnClick={editRecord}
                                        deleteConfirmed={deleteRecord}
                                    />
                                </Grid>
                            ))

                        }
                        <TimeRecord ref={timeEventEditor}></TimeRecord>
                    </Grid>
                </>

            ) : (<div></div>)}

        </>
    )


}

TimeTrackRecordList.propTypes = {
    timeRecordList: PropTypes.array
}

export default TimeTrackRecordList


