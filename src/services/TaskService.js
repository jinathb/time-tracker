import RestTemplate from '../utils/RestTemplate'

async function getAllTasks() {
    return await RestTemplate.get("/tasks");
}


async function saveTask(newTask) {
    return await RestTemplate.post("/tasks", newTask);
}

async function updateTask(id,newTask){
    return await RestTemplate.put("/tasks","/"+id, newTask);
}

async function deleteTask(id){
    return await RestTemplate.deleteRecord("/tasks/",id);
}

async function getAllTaskNames() {
    let allTaskNames=[];
    let response = await getAllTasks();
    
    if (response && !response.error) {
        let allTasks = response.data;
        allTasks.map((task)=>{
            allTaskNames.push(task.taskName);
        })
    }
    return allTaskNames;
}

const TaskService = {
    getAllTasks,
    saveTask,
    updateTask,
    getAllTaskNames,
    deleteTask
}
export default TaskService
