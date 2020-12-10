import axios from 'axios';
import deviceStorage from "../services/deviceStorage";
import authHeader from "../services/authHeader";
const baseURL='https://localhost:5001/api/';

const apiClient = axios.create({
    baseURL: baseURL
});

deviceStorage.getJWT().then((jwt) => {
  apiClient.defaults.headers.common.Authorization=`Bearer ${jwt}`;
  deviceStorage.getItem('hoaId').then((hoaId) => {
    
    apiClient.defaults.headers.common.hoaId=hoaId; 
  });
});
apiClient.defaults.withCredentials = true;

    apiClient.interceptors.response.use( (response) => {
        // Return a successful response back to the calling service
      
        return response;
      }, (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (!deviceStorage.getJWT() || error.response.status !== 401) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
    
      
        // Logout user if token refresh didn't work or user is disabled
        if (error.config.url === 'authentication/refreshtoken') {
          
            deviceStorage.deleteJWT();
            window.location.reload();
    
            return new Promise((resolve, reject) => {
                reject(error);
          });
        }
    
        // Try request again with new token
        return apiClient.post("authentication/refreshtoken/")
          .then((res) => {
            if (res.data.token) {
                deviceStorage.saveJWT( res.data.token);
              }
            // New request with new token
            const config = error.config;
            config.headers   = authHeader();
    
            return new Promise((resolve, reject) => {
              axios.request(config).then(response => {
                resolve(response);
              }).catch((error) => {
                reject(error);
              })
            });
    
          })
          .catch((error) => {
              Promise.reject(error);
          });
      });;
    


const setAuthHeader = (jwt) => {
    if (jwt) {
        apiClient.defaults.headers.common.Authorization=`Bearer ${jwt}`;
    }
    else {
        delete apiClient.defaults.headers.common.Authorization;
    }
};

export {apiClient,setAuthHeader};