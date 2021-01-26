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
      return apiClient.post("malfunctions/add/", data, {headers:{"Content-Type":"multipart/form-data"}});
    };

  export const getPicture = (id) => {
      return apiClient.get("malfunctions/picture/" + id, {
        responseType: 'arraybuffer'
      })
      ;
    };

export const getTypes = () => {
   
      return apiClient.get("malfunctions/types");
    };
  
  export const updateFailureStatus = (data) => {
      return apiClient.post("malfunctions/status", data);
    };