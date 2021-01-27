import {apiClient} from "../api/ApiClient";

const path = 'survey/';

const getSurveys = (page) => {
  return apiClient.get(path + 'all/' + page);
};

const getSurveyDetails = (id) => {
    return apiClient.get(path + id);
  };

const getTotalPages = () => {
    return apiClient.get(path + 'pages');
  };

const createSurvey = (survey) => {
    return apiClient.post(path, survey);
  };
  
const answerSurvey = (data) => {
    return apiClient.post(path + 'answer', data);
  };

const getQuestionTypes = () => {
    return apiClient.get(path + 'qtypes');
  };

const getSurveyResults = (id) => {
    return apiClient.get(path + 'results/' + id);
  };

  const downloadAttachment = (id, name) => {
    return apiClient.get(`${path}attachment?i=${id}&v=${name}`,  {responseType: 'blob'});
  };

export default {
    getSurveys,
    getSurveyDetails,
    getTotalPages,
    createSurvey,
    answerSurvey,
    getQuestionTypes,
    getSurveyResults,
    downloadAttachment
  };
  
  