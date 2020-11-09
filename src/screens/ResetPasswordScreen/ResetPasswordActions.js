import {apiClient} from "../../api/ApiClient";



  
export const forgotPassword = (email) => {
    return apiClient.post("authentication/forgotpassword/", { Email: email });
  };

  

