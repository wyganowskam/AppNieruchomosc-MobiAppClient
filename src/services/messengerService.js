import {apiClient} from "../api/ApiClient";

const path = 'chat/';


export const getAllChats = () => {
    return apiClient.get(path + 'all');
  };

export const createNewChat=(data) => {
    return apiClient.post(path+'create',data);
    };

 export const sendMessage=(data) => {
     return apiClient.post(path+'send',data);
    };
    

  export const getChatContent = (chatId) => {
    return apiClient.get("chat/"+ chatId );
  };
  