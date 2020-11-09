import {apiClient} from "../../api/ApiClient";

export const login =(userId,password) => {
    return apiClient.post('authentication/',{
        userId,
        password
    })
    
}

