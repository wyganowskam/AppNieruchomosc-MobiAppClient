import axios from 'axios';

const baseURL='https://localhost:5001/api/';

const apiClient = axios.create({
    baseURL: baseURL
});
const setAuthHeader = (jwt) => {
    if (jwt) {
        apiClient.defaults.headers.common.Authorization=`Bearer ${jwt}`;
    }
    else {
        delete apiClient.defaults.headers.common.Authorization;
    }
};

export {apiClient,setAuthHeader};