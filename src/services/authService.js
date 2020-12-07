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

export const logout =() => {
    revokeToken().catch(() => {
        deviceStorage.removeItem("userToken");
        deviceStorage.removeItem("hoaId");
        deviceStorage.removeItem("hoas");
        deviceStorage.removeItem("isAppAdmin");
        deviceStorage.removeItem("isBuildingAdmin");
        deviceStorage.removeItem("isBoard");
        deviceStorage.removeItem("isResident");
    
       
      });
      deviceStorage.removeItem("userToken");
      deviceStorage.removeItem("hoaId");
      deviceStorage.removeItem("hoas");
      deviceStorage.removeItem("isAppAdmin");
      deviceStorage.removeItem("isBuildingAdmin");
      deviceStorage.removeItem("isBoard");
      deviceStorage.removeItem("isResident");
};

export const register = registerRequest => {
    return apiClient.post('authentication/register/',registerRequest)

};

  
export const forgotPassword = (email) => {
    return apiClient.post("authentication/forgotpassword/", { Email: email });
  };

