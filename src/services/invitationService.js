import {apiClient} from "../api/ApiClient";

const path = 'invitation/';

export const getAllInvited = () => {
  return apiClient.get(path);
};

export const getMyInvitations = () => {
  return apiClient.get(path + 'mine');
};

export const createInvitation = (data) => {
  return apiClient.post(path, data);
};

export const modifyUserRole = (data) => {
  return apiClient.put(path, data);
};

export const acceptInvitation = (data) => {
  return apiClient.post(path + 'accept', data);
};
  