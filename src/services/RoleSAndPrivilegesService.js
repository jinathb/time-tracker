import RestTemplate from '../utils/RestTemplate'


async function getAllRoles() {
    return await RestTemplate.get("/roles");
}


async function saveRoles(newRole){
    return await RestTemplate.post("/roles",newRole);
}

async function updateRoles(newRole,id){
    return await RestTemplate.put("/roles","/"+id,newRole);
}

async function deleteRole(id){
    return await RestTemplate.deleteRecord("/roles","/"+id);
}

async function getAllPrevilegesCodes() {
    let response = await RestTemplate.get("/previleges");
    let allPrevilegeCodes = [];
    if (!response.error) {
        let allPrevileges = response.data;
        if (allPrevileges) {
            allPrevilegeCodes = allPrevileges.map(previlege => previlege.code);
        }
    }
    return allPrevilegeCodes;
}

async function getAllRoleNames(){
    let response= await RestTemplate.get("/roles");
    let roleNames=[];
    if(!response.error){
        let allRoles=response.data;
        if(allRoles){
            roleNames=allRoles.map(role=>role.roleName);
        }
    }
    return roleNames;
}


const RolesAndPrevileges = {
    getAllRoles,
    getAllRoleNames,
    saveRoles,
    updateRoles,
    getAllPrevilegesCodes,
    deleteRole
};

export default RolesAndPrevileges;