import {apiClient} from "../api/ApiClient";


export const getAllFailures = () => {
    return apiClient.get("malfunctions/all/");
  };
  
  export const getAllFailuresByUserId = () => {
      return apiClient.get("malfunctions/findMalfunctionByOwnersGuid/");
    };
    
export const getAllStatuses = () => {
      return apiClient.get("malfunctions/statuses");
    };
  
  export const addFailure = (data) => {
      return apiClient.post("malfunctions/add/", data);
    };

  export const getPicture = (id) => {
      return apiClient.get("malfunctions/picture/" + id, {
        responseType: 'arraybuffer'
      })
      .then(response => Buffer.from(response.data, 'binary').toString('base64'));
    };

export const getTypes = () => {
    console.log("AAAAAAA")
      return apiClient.get("malfunctions/types");
    };
  
  export const updateFailureStatus = (data) => {
      return apiClient.post("malfunctions/status", data);
    };