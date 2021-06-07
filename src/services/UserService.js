import HttpClient from '../utils/HttpClient'


async function getUserList() {
    try {
        const response = await HttpClient.get('/users');
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.error(err.response.status + "  " + err);
        } else if (err.request) {
            // client never received a response, or request never left
            console.error(err.request.status);
        } else {
            console.error(err)
        }
    }
}

async function addUser(user) {
    try {
        const response = await HttpClient.post('/users',user);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.error(err.response.status + "  " + err);
        } else if (err.request) {
            // client never received a response, or request never left
            console.error(err.request.status);
        } else {
            console.error(err)
        }
    }
}

async function updateUser(user) {
    try {
        const response = await HttpClient.put('/users/'+user.id,user);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.error(err.response.status + "  " + err);
        } else if (err.request) {
            // client never received a response, or request never left
            console.error(err.request.status);
        } else {
            console.error(err)
        }
    }
}

async function deleteUser(user) {
    try {
        const response = await HttpClient.delete('/users/'+user.id);
        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        if (err.response) {
            // client received an error response (5xx, 4xx)
            console.error(err.response.status + "  " + err);
        } else if (err.request) {
            // client never received a response, or request never left
            console.error(err.request.status);
        } else {
            console.error(err)
        }
    }
}


const UserService = {
    getUserList,
    addUser,
    updateUser,
    deleteUser
};

export default UserService;


