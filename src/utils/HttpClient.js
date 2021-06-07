import axios from 'axios'

const getToken = () => {
    return "Bearer " + localStorage.getItem('sample.app.token');
}

export default axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-type": "application/json",
        "Accept":"application/json",
        "Authorization":getToken()
    }
});