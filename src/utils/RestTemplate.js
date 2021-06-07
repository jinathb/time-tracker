import HttpClient from './HttpClient'


async function get(path) {
    let getResponse={};
    try {
        const response = await HttpClient.get(path);
        if (response.status === 200) {
            getResponse.data= response.data;
        }
    } catch (err) {
        getResponse.error=err;
    }
    return getResponse;
}



async function post(path,postData) {
    let postResponse={};
    try {
        const response = await HttpClient.post(path,postData);
        postResponse.status=response.status
        if (response.status === 200) {
            postResponse.data=response.data;
        }
    } catch (err) {
        postResponse.error=err;
    }
    return postResponse;
}


async function put(path,putQuery,putData) {
    let putResponse={};
    try {
        const response = await HttpClient.put(path +"/"+putQuery,putData);
        putResponse.status=response.status;
        if (response.status === 200) {
            putResponse.data=response.data;
        }
    } catch (err) {
        putResponse.error=err;
    }
    return putResponse;
}

async function deleteRecord(path,deleteQuery) {
    let deleteResponse={}
    try {
        const response = await HttpClient.delete(path +"/"+deleteQuery);
        if (response.status === 200) {
            deleteResponse= response.data;
        }
    } catch (err) {
        deleteResponse.error=err;
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
    return deleteResponse;
}


function handleError(err){
    let error=null;
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

const RestTemplate = {
    get,
    post,
    put,
    deleteRecord
};

export default RestTemplate;