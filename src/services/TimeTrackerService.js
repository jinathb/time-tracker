import RestTemplate from '../utils/RestTemplate'


async function getAllEvents() {
    return await RestTemplate.get("/timetrackingevents?status=CLOSE");
}

async function getOpenEvent() {
    console.log("------get open event--------");
    return await RestTemplate.get("/timetrackingevents?status=OPEN");
}

async function saveEvent(newEvent) {
   return await RestTemplate.post("/timetrackingevents",newEvent);
}

async function updateEvent(id,newEvent) {
    return await RestTemplate.put("/timetrackingevents",id,newEvent);
}


const TimeTrackerService= {
    getAllEvents,
    getOpenEvent,
    saveEvent,
    updateEvent
}

export default TimeTrackerService