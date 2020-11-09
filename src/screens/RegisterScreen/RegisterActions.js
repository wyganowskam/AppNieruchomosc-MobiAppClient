import {apiClient} from "../../api/ApiClient";

export const register = registerRequest => {
    return apiClient.post('authentication/register/',registerRequest)

}

