import {apiClient} from "../api/ApiClient";

export const revokeToken=() => {
return apiClient.post('users/revoketoken');
};

export const getUserInfo = () => {
    return apiClient.get('users/');
  };
  