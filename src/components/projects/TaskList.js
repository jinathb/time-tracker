import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import TaskService from '../../services/TaskService'

import TableListView from '../utils/TableListView';

function TaskList() {

    const history = useHistory();
    const [rows, setRows] = useState([])

    async function getAllTask() {
        let response = await TaskService.getAllTasks();
        if (response && !response.error) {
            let allTasks = response.data;
            console.log(allTasks[0].taskName);
            setRows(allTasks)
        }
    }

    useEffect(() => {
        getAllTask();
        return () => {

        }
    }, [])

    const columns = [
        { field: "id", headerName: "ID", width: 100, type: "number" },
        { field: "taskName", headerName: "Role Name", width: 450 },
        { field: "description", headerName: "Description", width: 450 },
    ];


    const addRecord = () => {
        history.push({ pathname: '/task' });
    }

    const editRecord = (record) => {
        history.push({ pathname: '/task' ,state: { task: record} });
    }

    const deleteRecord = async (record) => {
        let response = await TaskService.deleteTask(record.id);
        if (!response.error) {
            getAllTask();
        }
    }


    return (
        <div style={{ height: 400, width: '100%' }}>
            <TableListView
                title="Tasks"
                columns={columns}
                rows={rows}
                addButton={true}
                deleteButton={true}
                editButton={true}
                addOnClick={addRecord}
                editOnClick={editRecord}
                deleteConfirmed={deleteRecord}
            />
        </div>
    )
}

export default TaskList
