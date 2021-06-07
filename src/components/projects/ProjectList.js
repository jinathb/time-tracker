import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import ProjectService from '../../services/ProjectService'
import TableListView from '../utils/TableListView';

function ProjectList(props) {

    const history = useHistory();
    const [rows, setRows] = useState([])


    async function getAllProjects() {
        let response = await ProjectService.getAllProjects();
        if (response && !response.error) {
            let allProjects = response.data;

            setRows(allProjects);
        }
    }

    useEffect(() => {
        getAllProjects();
        return () => {

        }
    }, [])

    const columns = [
        { field: "id", headerName: "ID", flex: 1, type: "number" },
        { field: "projectName", headerName: "Project Name", flex: 2 },
        { field: "description", headerName: "Description", flex: 2 },
        { field: "client", headerName: "Client", flex: 2 },
    ];




    function addRecord() {
        history.push({ pathname: '/project' });
    }

    async function deleteRecord(selectedRecord) {
        let response = await ProjectService.deleteProject(selectedRecord.id);
        if (!response.error) {
            getAllProjects();
        }
    }

    function editRecord(selectedRecord) {
        history.push({ pathname: '/project', state: { projectDetails: selectedRecord } });
        // alert("parent edit method: " + selectedRecord.id);
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <TableListView
                title="Projects"
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

ProjectList.propTypes = {

}

export default ProjectList

