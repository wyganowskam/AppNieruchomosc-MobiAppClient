import {apiClient} from "../api/ApiClient";

const path = 'announcement/';

const getAnnouncements = (page) => {
  return apiClient.get(path + 'all/' + page);
};

const getAnnouncementDetails = (id) => {
  return apiClient.get(path + id);
};

 const getComments = (id, page) => {
  return apiClient.get(path + id + '/comments?page=' + page);
};

const getAnnouncementsPagesCount = () => {
  return apiClient.get(path + 'pages');
};

const getCommentPagesCount = (id) => {
  
  return apiClient.get(path + id + '/pages');
};

const createAnnouncement = (data) => {
  return apiClient.post(path, data);
};

const createComment = (data) => {
  return apiClient.post(path + 'comment', data);
};

const setAllowComments = (data) => {
  
  return apiClient.post(path + 'AllowComments', data);
};

const downloadAttachment = (id, name) => {
  return apiClient.get(`${path}attachment?i=${id}&v=${name}`,  {responseType: 'blob'});
};
  
export default {
  getAnnouncements,
  getAnnouncementDetails,
  createAnnouncement,
  createComment,
  setAllowComments,
  getComments,
  getAnnouncementsPagesCount,
  getCommentPagesCount,
  downloadAttachment
  };
  
  