import {apiClient} from "../api/ApiClient";

export const revokeToken=() => {
return apiClient.post('users/revoketoken');
};

export const getUserInfo = () => {
    return apiClient.get('users/');
  };
  
  export const getAllUsers = () => {
    return apiClient.get('users/all');
  };

  export const getUserByEmail = (email) => {
    return apiClient.get("users/"+ email );
  };