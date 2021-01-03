import { apiClient as api } from '../api/ApiClient';

const path = 'announcement/';

const getAnnouncements = (page) => {
  return api.get(path + 'all/' + page);
};

const getAnnouncementDetails = (id) => {
  return api.get(path + id);
};

const getComments = (id, page) => {
  return api.get(path + id + '/comments?page=' + page);
};

const getAnnouncementsPagesCount = () => {
  return api.get(path + 'pages');
};

const getCommentPagesCount = (id) => {
  console.log(id);
  return api.get(path + id + '/pages');
};

const createAnnouncement = (data) => {
  return api.post(path, data);
};

const createComment = (data) => {
  return api.post(path + 'comment', data);
};

const setAllowComments = (data) => {
  return api.post(path + 'AllowComments', data);
};
  
export default {
  getAnnouncements,
  getAnnouncementDetails,
  createAnnouncement,
  createComment,
  setAllowComments,
  getComments,
  getAnnouncementsPagesCount,
  getCommentPagesCount
  };
  
  