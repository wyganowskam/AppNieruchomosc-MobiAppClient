import deviceStorage from "./deviceStorage";
import {apiClient} from "../api/ApiClient"

export default function authHeader() {
    return deviceStorage.getItem('id_token')
        .then((userTokenVal)=>{
        return deviceStorage.getItem('hoaId')
            .then((hoaIdVal)=>{
            const userToken = userTokenVal;
            const currentHoa = hoaIdVal;
            if (userToken) {
               apiClient.defaults.headers.common.Authorization= 'Bearer ' + userToken;
               apiClient.defaults.headers.common.hoaId=currentHoa;
              } else {
                apiClient.defaults.headers.common= {};
              }


        });
        });

  }