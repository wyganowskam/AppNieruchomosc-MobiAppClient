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
  
  export const updateFailureStatus = (data) => {
      return apiClient.post("malfunctions/status", data);
    };