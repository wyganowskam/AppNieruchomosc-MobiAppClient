import {apiClient} from "../../api/ApiClient";


export const getUserInfo = () => {
    return apiClient.get('users/');
  };
  
  
