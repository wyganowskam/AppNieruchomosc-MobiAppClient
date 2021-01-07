import {apiClient} from "../api/ApiClient";

const path = 'shares/';

const getAllShareSubjects = () => {
  return apiClient.get(path);
};

const getUserShareSubjects = () => {
  return apiClient.get(path + 'mine');
};

const addShareSubject = (data) => {
  return apiClient.post(path, data);
};

const deleteShareSubject = (id) => {
  return apiClient.delete(path + id);
};

const modifyOwner = (subjectId, ownerId) => {
  return apiClient.put(path, {subjectId: subjectId, userId: ownerId});
};

const getShareSubjectTypes = () => {
  return apiClient.get(path + 'types');
};

const getShareSubjectById = (id) => {
  return apiClient.get(path + 'byid/' + id);
};
  
export default {
  getAllShareSubjects,
  getUserShareSubjects,
  addShareSubject,
  deleteShareSubject,
  modifyOwner,
  getShareSubjectTypes,
  getShareSubjectById,
  };
  
  