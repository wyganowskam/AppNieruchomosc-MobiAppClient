import {apiClient} from "../api/ApiClient";
import { revokeToken} from './userService';
import deviceStorage from "./deviceStorage"


export const getUserInfo = () => {
    return apiClient.get('users/');
};
  
  
export const login =(userId,password) => {
    return apiClient.post('authentication/',{
        userId,
        password
    })
    
};


export const register = registerRequest => {
    return apiClient.post('authentication/register/',registerRequest)

};

  
export const forgotPassword = (email) => {
    return apiClient.post("authentication/forgotpassword/", { Email: email });
  };

