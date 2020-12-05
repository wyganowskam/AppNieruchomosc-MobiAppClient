import {apiClient} from "../api/ApiClient";

const path = 'apartment/';

export const getApartments = () => {
  return apiClient.get(path);
};


export const getProperties = () => {
  return apiClient.get(path + 'properties');
};

export const addApartment = (data) => {
  return apiClient.post(path, data);
};

export const deleteApartment = (id) => {
  return apiClient.delete(path + id);
};

export const modifyOwner = (apartmentId, homeOwner) => {
  return apiClient.put(path, {apartmentId: apartmentId, userId: homeOwner});
};


