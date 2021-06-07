import React from 'react'
import RestTemplate from '../utils/RestTemplate'

const getAllProjects=async()=>{
    return await RestTemplate.get("/projects");
}

async function saveProject(newProject){
    return await RestTemplate.post("/projects",newProject);
}

async function updateProject(id,newProject) {
    return await RestTemplate.put("/projects/",id,newProject);
}

async function deleteProject(id){
    return await RestTemplate.deleteRecord("/projects/",id);
}

const ProjectService= {
    getAllProjects,
    saveProject,
    updateProject,
    deleteProject
}



export default ProjectService
